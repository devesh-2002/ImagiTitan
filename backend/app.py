from flask import Flask, request, jsonify
import base64
import io
import json
import logging
import boto3
from PIL import Image
from flask_cors import CORS

from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app)
class ImageError(Exception):
    "Custom exception for errors returned by Amazon Titan Image Generator G1"

    def __init__(self, message):
        self.message = message

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def generate_image(model_id, body):
    logger.info(
        "Generating image with Amazon Titan Image Generator G1 model %s", model_id)

    bedrock = boto3.client(service_name='bedrock-runtime')

    accept = "application/json"
    content_type = "application/json"

    response = bedrock.invoke_model(
        body=body, modelId=model_id, accept=accept, contentType=content_type
    )
    response_body = json.loads(response.get("body").read())

    base64_image = response_body.get("images")[0]
    base64_bytes = base64_image.encode('ascii')
    image_bytes = base64.b64decode(base64_bytes)

    finish_reason = response_body.get("error")

    if finish_reason is not None:
        raise ImageError(f"Image generation error. Error is {finish_reason}")

    logger.info(
        "Successfully generated image with Amazon Titan Image Generator G1 model %s", model_id)

    return image_bytes

@app.route('/generate-image', methods=['POST'])
def generate_image_route():
    try:
        model_id = 'amazon.titan-image-generator-v1'

        data = request.json
        prompt = data["prompt"]

        body = json.dumps({
            "taskType": "TEXT_IMAGE",
            "textToImageParams": {
                "text": prompt
            },
            "imageGenerationConfig": {
                "numberOfImages": 1,
                "height": 1024,
                "width": 1024,
                "cfgScale": 8.0,
                "seed": 0
            }
        })

        image_bytes = generate_image(model_id=model_id, body=body)
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')

        return jsonify({"image": image_base64})

    except ClientError as err:
        message = err.response["Error"]["Message"]
        logger.error("A client error occurred: %s", message)
        return jsonify({"error": f"A client error occurred: {message}"}), 500
    except ImageError as err:
        logger.error(err.message)
        return jsonify({"error": err.message}), 500

if __name__ == "__main__":
    app.run(debug=True)

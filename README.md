# ImagiTitan

Generate Images using Amazon Titan Image Generator G1 Model. 

## Tech Stack
1. AWS Bedrock
2. Docker
3. Amazon Titan Model
4. Libraries : Flask, boto3
5. Next.js
6. TailwindCSS

## Running the project
1. Fork and Clone the repository.
2. Create an AWS Free Tier Account.
3. Create IAM User in the desired region (**preferably us-east-1**) and save both the Access Keys.
4. Configure AWS CLI and enter all the details required like Access key ID, Secret Access Key, Region:
```
aws configure
```
5. In the backend directory, install the requirements and activate the environment(depending on the command line interface) :
```
pip install -r requirements.txt
virtualenv env
env/Scripts/activate
```
OR 
```
pip install -r requirements.txt
virtualenv env
source env/Scripts/activate
```
6. Run the app.py file :
```
python app.py
```
7. In the frontend directory, install the packages and run the frontend :
```
yarn
yarn dev
```
### Screenshots 
![image](https://github.com/devesh-2002/ImagiTitan/assets/79015420/a954ebc1-6402-4523-9011-9255a769bf11)

"use client"
import React, { useState, ChangeEvent } from 'react';

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const generateImage = () => {
    fetch('http://localhost:5000/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputText }),
    })
      .then((response) => response.blob()) // Convert response to Blob
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob); // Create blob URL
        setImageSrc(imageUrl); // Set image URL to state
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-center text-3xl font-bold mb-8'>Titan Image Generator</h1>
      <div className='flex justify-center'>
        <div className='flex'>
          <input
            type='text'
            className='w-96 text-black px-6 py-3 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300'
            placeholder='Which image do you want?'
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'
            onClick={generateImage}
          >
            Generate Image
          </button>
        </div>
      </div>
      {imageSrc && (
        <div className='flex justify-center mt-8'>
          <img src={imageSrc} alt='Generated Image' className='max-w-md' />
        </div>
      )}
    </div>
  );
}

export default Home;

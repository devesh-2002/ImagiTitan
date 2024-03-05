import React from 'react';

function Home() {
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-center text-3xl font-bold mb-8'>Titan Image Generator</h1>
      <div className='flex justify-center'>
        <div className='flex'>
          <input
            type='text'
            className='w-96 text-black px-6 py-3 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300'
            placeholder='Which image do you want?'
          />
          <button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300'>
            Generate Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

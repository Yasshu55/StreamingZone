import React from 'react'


export default function HomePage() {
  return (
      <div className='text-white'>
        <div className='max-w-[1300px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>            
            <div>
                <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
                    Screen Streaming
                </button>
                <br />
                <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
                    Video Streaming
                </button>
            </div>
        </div>
    </div>
  )
}

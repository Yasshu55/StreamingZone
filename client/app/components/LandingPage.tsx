import React from 'react'

export default function LandingPage() {
  return (
    <div className='text-white'>
        <div className='max-w-[1300px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#ffffff] font-bold p-2 md:text-4xl sm:text-4xl text-2xl md:py-6'>Welcome to StreamingZone - Multiplatform live streaming tool</p>
            
            <div>
                <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
                    Let's start
                </button>
            </div>
        </div>
    </div>
  )
}

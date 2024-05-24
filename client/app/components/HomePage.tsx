import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
    const router = useRouter()
  return (
      <div className='text-white'>
        <div className='max-w-[1300px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>            
            <div>
                <Link href={{
                    pathname: '/platforms',
                    query: {
                        type: "screen"
                    }
                }}>
                <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
                    Screen Streaming
                </button>
                </Link>
                <br />
                <Link href={{
                    pathname: '/platforms',
                    query: {
                        type: "video"
                    }
                }}>
                <button className='bg-[#f0a417] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
                    Video Streaming
                </button>
                    </Link>
            </div>
        </div>
    </div>
  )
}

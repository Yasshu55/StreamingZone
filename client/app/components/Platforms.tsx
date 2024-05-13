import React from 'react'
import { FaYoutube  } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";



export default function Platforms() {
  return (
    <div className='text-white bg-white'>
        <div className='max-w-[1300px] mt-[-100px] w-full h-screen mx-auto text-center flex flex-col justify-center'>            
            <div>
                 <h1 className='w-full text-3xl font-bold text-[#000000]'>Select platforms to stream on</h1>
            </div>
            <br />
            <form className='mt-[70px] text-black' action="" method="post">
                <div className='flex justify-center'>
                <FaYoutube size={60} className='pr-9' />
                    <input type="text" placeholder='Enter Stream Key'/>
                    <br />
                    <br />
                </div>
                <div className='flex justify-center'>
                <FaFacebook size={60} className='pr-9'/>
                    <input type="text" placeholder='Enter Stream Key'/>
                    <br />
                    <br />
                </div>
                <div className='flex justify-center'>
                <FaTwitch size={60} className='pr-9'/>
                    <input type="text" placeholder='Enter Stream Key'/>
                    <br />
                    <br />
                </div>
                <button className='bg-[#27ffbb] w-[120px] rounded-md font-medium my-3 mx-auto py-2 text-black' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

'use client'
import React from 'react'
import '../globals.css'
import Platforms from '../components/Platforms'
import {useState,useEffect} from 'react'
import { AiOutlineClose,AiOutlineMenu} from "react-icons/ai";
import Link from 'next/link';
import { FaRegUserCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function PlatformsClient() {
    const router = useRouter();
    const [nav,setNav] = useState(false)

    useEffect(()=>{
      const token = localStorage.getItem('auth-token')
  
      if(token === null){
        router.push("/login")
      }
    },[])
    

  const handleNav = () =>{
      setNav(!nav)
  }

  return (
   <div>
    {/* Navbar code */}
    <header >
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black '>
        <h1 className='w-full text-3xl font-bold text-[#2fdcff]'><Link href="/">
            StreamingZone
        </Link></h1>
        <ul className='hidden md:flex'>
        <Link href="/">
            <li className='p-4'>Home</li>
        </Link>
        <Link href="/">
            <li className='p-4'>About</li>
        </Link>
        <Link href="/" className='p-4'>
            <FaRegUserCircle size={25}/>
        </Link>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineMenu  size={20}/> : <AiOutlineClose size={20} />}
        </div>
        <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
            <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>Pixel Speak</h1>              
            <Link href="/">
            <li className='p-4'>Home</li>
            </Link>
            <Link href="/">
                <li className='p-4'>About</li>
            </Link>
            <Link href="/" className='p-10'>
                <FaRegUserCircle size={25}/>
            </Link>
        </ul>
    </div>
    </header>
    <main >
      <Platforms />
    </main>
   </div>
  )
}

'use client'

import React, { useEffect } from 'react'
import HomePage from '../components/HomePage'
import '../globals.css'
import { useRouter } from 'next/navigation';

import NavBar from '../components/NavBar'

export default function HomeClient() {
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('auth-token')

    if(token === null){
      router.push("/login")
    }
  },[])

  return (
    <div>
        <header>
            <NavBar />
        </header>
        <main>
            <HomePage />
        </main>
    </div>
  )
}

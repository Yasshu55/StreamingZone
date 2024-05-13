'use client'
import React from 'react'
import '../globals.css'
import Platforms from '../components/Platforms'
import NavBar from '../components/NavBar'

export default function PlatformsClient() {
  return (
   <div>
    <header>
      <NavBar/>
    </header>
    <main>
      <Platforms />
    </main>
   </div>
  )
}

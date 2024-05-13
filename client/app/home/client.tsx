'use client'
import React from 'react'
import HomePage from '../components/HomePage'
import '../globals.css'
import NavBar from '../components/NavBar'

export default function HomeClient() {
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

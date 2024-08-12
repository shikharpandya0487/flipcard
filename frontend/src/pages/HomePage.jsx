import React from 'react'
import Navbar from '../components/Navbar'
import Flashcard from '../components/flashcard'

function HomePage() {
  return (
    <div className='w-screen min-h-screen'>
        <Navbar/>
        <Flashcard/>
    </div>
  )
}

export default HomePage

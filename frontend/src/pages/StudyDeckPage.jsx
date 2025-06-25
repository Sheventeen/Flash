import { LogOut, Menu, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useFlashcardStore } from '../store/flashcardStore';
import { useEffect } from 'react';

const StudyDeckPage = () => {

  const {deck, createDeck} = useFlashcardStore();


  const [currDeck, setCurrDeck] = useState([]);
  const [sideBar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }
  const handleLogOut = () => {
    
  }

  useEffect(() => {
    console.log(deck)
    console.log(deck.cards[0]?.front)
    setCurrDeck(deck.cards)
    console.log(currDeck)
    console.log('on mount of study deck');
  },[currDeck])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='h-16 items-center justify-end flex border-b-2 border-gray-500'>
          <div onClick={handleSideBar}>
            {!sideBar ? <Menu className='size-6 font-bold md:hidden flex' /> : <X className='size-6 font-bold md:hidden flex' />}        
          </div>
          <LogOut className='m-5 size-6 hover:cursor-pointer' onClick={handleLogOut} /> 
      </div>
      <div className='flex flex-1'>
        <div className=' md:flex flex-col w-60 hidden border-r-2 border-gray-500'>
            <Sidebar />
        </div>

        <div className={sideBar ? 'fixed top-0 left-0 z-50 ease-in-out duration-400 md:hidden w-[60%] border-r h-full bg-[#1c1d22]' 
                          : ' fixed top-0 left-[-100%] '}>
              <Sidebar />
        </div>
        <div className='border-2 w-full border-blue-700 flex-col'>
          <div className='flex p-5 text-4xl font-bold'>
              <h1>My Decks</h1>
          </div>
          <div>
          {}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyDeckPage
import React, { useEffect, useState } from 'react'
import {animate, motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Loader, LogOut, Menu, Sidebar, Undo2, User, X } from 'lucide-react';
import Button from '../components/Button';
import Flashcard from '../../../backend/models/FlashcardModel';


const DashBoardPage = () => {
    const {user, logout, isLoading, getDecks} = useAuthStore();
    const [isRotated, setIsRotated] = useState(false);
    const [userDecks, setUserDecks] = useState([]);
    const [randomDeck, setRandomDeck] = useState(-1);
    const [shuffledDeck, setShuffledDeck] = useState([]);
    const [know, setKnow] = useState([]);
    const [dontKnow, setDontKnow] = useState([]);
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();

      useEffect(() => {
       console.log('Page rerender seffect') 
      })

      useEffect(() => {
      const topics = user.decks.map( (deckObj) => deckObj.deck)
      setUserDecks(topics);
    }, []);
    
       useEffect(() => {      
        setRandomDeck(Math.floor(Math.random() * userDecks.length));
        const deck = userDecks[randomDeck]; 
        console.log('deck',deck);

        for(let i = randomDeck.length - 1;i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]]
        }
        setShuffledDeck(deck)
        console.log('render ', shuffledDeck)
      },[userDecks])

    const handleLogOut = async(e) => {
      e.preventDefault();
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.log(error)
      }
    }

    const handleFlipCard = (e) => {
      setIsRotated(prev => !prev)

    }
    const handleSideBar = () => {
      setSideBar(!sideBar);
    }

  return (
    <div className='flex flex-col h-screen'>
      <div className='border-2 h-16 items-center justify-end flex'>
          <div onClick={handleSideBar}>
            {!sideBar ? <Menu className='size-6 font-bold md:hidden flex' /> : <X className='size-6 font-bold md:hidden flex' />}        
          </div>
          <LogOut className='m-5 size-6 hover:cursor-pointer' onClick={handleLogOut} /> 
      </div>
        <div className='flex flex-1 border-2 border-red-700'>

          <div className='border-2 md:flex flex-col w-60 hidden'>
            <ul className='mt-5 flex flex-col items-center'>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Search</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Home</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Create Deck</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>My Decks</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Contact</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Help</li>
            </ul>
          </div>

          <div className={sideBar ? 'fixed top-0 left-0 z-50 ease-in-out duration-400 md:hidden w-[60%] border-r h-full bg-[#1c1d22]' 
          : ' fixed top-0 left-[-100%] '}>
              <ul className='mt-5 flex flex-col items-center'>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Search</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Home</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Create Deck</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>My Decks</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Contact</li>
              <li className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Help</li>
            </ul>
          </div>

          <div className='border-purple-700 border-2 w-full flex flex-col items-center justify-center h-full '>
            <motion.div 
            className='max-w-md max-h-80 w-full bg-[#00688f] bg-opacity-50 backdrop-filter backdrop-blur-xl 
                       rounded-md shadow-xl overflow-auto  items-center flex flex-1 justify-center'>
              <p className='break-words whitespace-normal text-md w-full p-5 text-center'>
                h12
              </p>
            </motion.div>
            <div className='flex max-w-md w-full gap-16 justify-center pt-3 items-center mt-5'>
              <button className='flex items-center justify-center border-4 border-gray-200 h-16 w-24 rounded-xl p-2'>
                <Undo2 className='size-15' /> 
              </button>
              <button className='flex items-center justify-center border-4 border-gray-200 h-16 w-24 rounded-xl p-2 text-red-600'>
                <X className='size-16' />                
              </button>
              <button className='flex items-center justify-center border-4 border-gray-200 h-16 w-24 rounded-xl p-2 text-green-600'>
                  <Check className='size-16' />               
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}
export default DashBoardPage
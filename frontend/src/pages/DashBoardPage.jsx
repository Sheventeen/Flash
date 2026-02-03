import React, { useEffect, useState } from 'react'
import {animate, motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Loader, LogOut, Menu, Undo2, X } from 'lucide-react';
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';

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
       //console.log('Page rerender seffect') 
      })

      useEffect(() => {
      const topics = user.decks.map( (deckObj) => deckObj.deck)
      setUserDecks(topics);
    }, []);
    
       useEffect(() => {      
        setRandomDeck(Math.floor(Math.random() * userDecks.length));
        const deck = userDecks[randomDeck]; 
        //console.log('deck',deck);

        for(let i = randomDeck.length - 1;i > 0; i--){
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]]
        }
        setShuffledDeck(deck)
        //console.log('render ', shuffledDeck)
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

          <div className='w-full flex flex-col items-center justify-center h-full '>
          <h1 className='text-5xl'>
            Dashboard Page</h1>
            <p className=' mt-10'>Deck Name</p>
            <motion.div 
            className='max-w-md max-h-80 w-full mt-5 bg-[#00688f]/50 backdrop-filter backdrop-blur-xl 
                       rounded-md shadow-xl overflow-auto  items-center flex flex-1 justify-center'>
              <p className='break-words whitespace-normal text-md w-full p-5 text-center'>
                Start Studying
              </p>
            </motion.div>
            <div className='flex max-w-md w-full gap-16 justify-center pt-3 items-center mt-5 border-b pb-4 border-gray-400'>
              <Button icon={Undo2} color='' size='size-15'
              />
              <Button icon={X} color='text-red-600'
              />
              <Button icon={Check} color='text-green-600'
              />
            </div>
          </div>
        </div>
    </div>
  )
}
export default DashBoardPage
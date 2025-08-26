import { LogOut, Menu, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useAuthStore } from '../store/authStore';
import { useFlashcardStore } from '../store/flashcardStore';
import { useNavigate } from 'react-router-dom';

const MyDecksPage = () => {

  const {user, logout, isLoading, getDecks} = useAuthStore();
  const {deck, createDeck, viewDeck} = useFlashcardStore();

  const [sideBar, setSideBar] = useState(false);
  const [myDecks, setMyDecks] = useState([...user.decks]);
  const navigate = useNavigate();

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }
  const handleLogOut = async(e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  const handleCardChange = () => {

  }
  const handleViewDeck = async(e,userId,deckId) => {
    e.preventDefault();
    try {
      await viewDeck(deckId)
      navigate(`/${user.firstName}/${deckId}`)
    } catch (error) {
      console.log(error)
    }
  }

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
              <div className='border-2 border-pink-300'>

                {myDecks.map((deck, i) => (
                  <div 
                  key={i}
                  className='mb-5 border-2 rounded-xl p-5 mx-auto bg-blue-800/17 max-w-md min-h-40 hover:cursor-pointer hover:bg-gray-200/10'
                  onClick={(e) => handleViewDeck(e, user._id, deck.deck)}
                  >
                  <div className='flex items-center justify-end mr-2'>
                    <h1 className=' flex text-2xl hover:cursor-default'>{i + 1} </h1>
                    <Trash2 
                    className='hover:cursor-pointer ml-3'
                    />
                  </div>
                  <div className='text-center break-words'>
                    {deck.topic}
                  </div>

                  </div>
            ))}
              </div>
          </div>
        </div>
    </div>
  )
}

export default MyDecksPage
import { Check, EditIcon, LogOut, Menu, Shuffle, Trash, Trash2, Undo2, X } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useFlashcardStore } from '../store/flashcardStore';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const StudyDeckPage = () => {

  const navigate = useNavigate();
  const {userName, deckId} = useParams();
  const {deck, viewDeck, createDeck, deleteDeck} = useFlashcardStore();


  const [currDeck, setCurrDeck] = useState([]);
  const [dontKnow, setDontKnow] = useState([]);

  const [sideBar, setSideBar] = useState(false);
  const [count, setCount] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }
  const handleLogOut = () => {
    
  }
  const handleUndo = () => {
    if (count > 0){
      setCount(count - 1)
    }
  }
  const handleKnowCard = () => {
    setCount((count + 1) % currDeck.length)
  }
  const handleDontKnowCard = () => {
    setDontKnow(prevDontKnow => [...prevDontKnow, currDeck[count]])
    setCount((count + 1) % currDeck.length)
  }
  const handleConfirmDelete = () => {
    setShowDelete(prev => !prev);
  }
  const handleCardFlip = () => {
    setFlip(!flip);
  }
  const handleDeleteDeck = async() => {
    try {
      console.log(deckId)
      await deleteDeck(deckId);
      setCount((count + 1) % 3)
      navigate(('/dashboard'))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    viewDeck(deckId);
    console.log('on mount of study deck');
  },[deckId])

  useEffect(() => {
    if(deck?.cards?.length){
      let currIndex = deck.cards.length;
      const shuffled = [...deck.cards]
      while(currIndex != 0){
        let randIndex = Math.floor(Math.random() * currIndex);
        currIndex--;
        [shuffled[currIndex], shuffled[randIndex]] = 
        [shuffled[randIndex], shuffled[currIndex]];
      }
      setCurrDeck(shuffled);
    }
      console.log(currDeck);
    },[deck])

  return (
    <div className='flex flex-col min-h-screen'>
        
      <div className='h-16 items-center justify-end flex border-b-2 border-gray-500'>
          <div onClick={handleSideBar}>
            {!sideBar ? <Menu className='size-6 font-bold md:hidden flex' /> : <X className='size-6 font-bold md:hidden flex' />}        
          </div>
          <LogOut className='m-5 size-6 hover:cursor-pointer' onClick={handleLogOut} /> 
      </div>
      
      <div className='flex flex-1'>
        <div className='md:flex flex-col w-60 hidden border-r-2 border-gray-500'>
            <Sidebar />
        </div>

        <div className={sideBar ? 'fixed top-0 left-0 z-80 ease-in-out duration-400 md:hidden w-[60%] border-r h-full bg-[#1c1d22]' 
                          : ' fixed top-0 left-[-100%] '}>
              <Sidebar />
        </div>
        {showDelete ? 
        <div className='w-full h-screen z-50 bg-black/35 flex justify-center items-center'>
          <div className='flex flex-col items-center text-center h-80 w-md bg-[#00688f]/50 rounded-xl '>
            <h1 className='p-6'>
              Are you sure you want to delete this deck? You will not be able to reverse this action.
            </h1>
            <div className='flex items-end justify-around mb-6 border-2 h-full w-full '>
              <button className='border-2 rounded-2xl flex h-16 w-30 items-center justify-center' onClick={() => setShowDelete(prev => !prev)}>
                KEEP
              </button>
              <button className='border-2 rounded-2xl flex h-16 w-30 items-center justify-center' onClick={handleDeleteDeck}>
                DELETE
              </button>
            </div>
          </div>
        </div>
        :
        <div className='border-2 w-full border-blue-700 flex-col'>
          <div className='flex p-5 text-4xl font-bold justify-center'>
              <h1>{deck?.topic}</h1>
          </div>
          {/* <div className='flex flex-col'> */}
            <div className='border-2 max-h-full flex flex-col items-center'>
              <div>
                <h1>{count + 1}/{currDeck.length}</h1>
              </div>
              <div className='  max-w-md min-h-80 max-h-80 w-full mt-20 bg-[#00688f]/50 
                                backdrop-filter backdrop-blur-xl 
                                rounded-md shadow-xl overflow-auto items-center 
                                flex flex-1 justify-center'
                                onClick={handleCardFlip}>
                {!flip ? currDeck[count]?.front 
                       : currDeck[count]?.back}
              </div>
              <div className='flex max-w-md w-full gap-16 justify-center pt-3 items-center mt-5 border-2 pb-4 border-gray-400'>
                <Button icon={Undo2} color='' size='size-15' onClick={handleUndo}
                />
                <Button icon={X} color='text-red-600' onClick={handleDontKnowCard}
                />
                <Button icon={Check} color='text-green-600' onClick={handleKnowCard}
                />
              </div>
              <div className='flex max-w-md w-full gap-16 justify-center pt-3 items-center mt-5 border-2 pb-4 border-gray-400'>
                <Button icon={Shuffle} color='' size='size-15'
                />
                <Button icon={Trash2} color='text-red-600' onClick={handleConfirmDelete}
                />
                <Button icon={EditIcon} color='text-green-600'
                />
              </div>
          </div>
          {/* </div> */}
        </div>
        } 
      </div>
</div>
)
}
export default StudyDeckPage
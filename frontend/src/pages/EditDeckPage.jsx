import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFlashcardStore } from '../store/flashcardStore';
import Sidebar from '../components/Sidebar';
import { LogOut, Menu, Plus, Save, Trash2, X } from 'lucide-react';

const EditDeckPage = () => {

  const navigate = useNavigate();

  const {userName, deckId} = useParams();
  const {deck, viewDeck, createDeck, deleteDeck, editDeck} = useFlashcardStore();

  const [cards, setCards] = useState([{front: '', back: ''}]);
  const [topic, setTopic] = useState('');
  const [sideBar, setSideBar] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  const handleSideBar = () => {
    setSideBar(!sideBar);
  }
  const handleLogOut = () => {
    
  }
  const handleCardChange = (index, cardSide, value) => {
    const updatedCards = [...cards];
    updatedCards[index][cardSide] = value;
    setCards(updatedCards);
  }
   const handleSave = async() => {
      try {
        await editDeck(deckId, topic, cards);
        navigate(`/${userName}/${deckId}`)
    } catch (error) {
        console.log(error)
    }
  }
  const handleAddCard = () => {
    setCards([...cards, {front: '', back: ''}])
  }
  const handleRemoveCard = (i) => {
    const currDeck = [...cards];
    currDeck.splice(i,1);
    setCards(currDeck)
  }

  useEffect(() => {
    viewDeck(deckId)
  },[deckId])

  useEffect(() => {
    if(deck?.cards?.length){
      setCards([...deck.cards])
    }
    if(deck?.topic?.length){
      setTopic(deck.topic);
    }
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
        <div className='flex items-center flex-col border-2 w-full'>
            <div className='flex my-[3%] font-bold text-3xl border-2 items-center justify-between max-w-md w-full p-3 sticky top-[10%] bg-[#1c1d22] rounded-2xl'>
                <Save 
                className='flex items-center justify-center h-14 w-full mx-10 border-2 rounded-md bg-blue-400 hover:cursor-pointer'
                onClick={handleSave}
                />
                <Plus 
                className='flex items-center justify-center h-14 w-full mx-10 border-2 rounded-md bg-blue-400'
                onClick={handleAddCard}
                />
            </div>
            <div className='max-w-md w-full h-18 border-2 my-5 flex items-center rounded-md'>
              <input 
              value={topic}
              placeholder='Topic'
              onChange={(e) => setTopic(e.target.value)}
              className='h-12 ml-10'
              />
            </div>
            <div>

              {cards.map((card, i) => (
                <div 
                key={i}
                className='mb-5 border-2 rounded-xl p-5 mx-auto bg-blue-800/17 max-w-md'
                >
                <div className='flex items-center justify-end mr-2'>
                  <h1 className=' flex text-2xl hover:cursor-default'>{i + 1} </h1>
                  <Trash2 
                  className='hover:cursor-pointer ml-3'
                  onClick={() => handleRemoveCard(i)}
                  />
                </div>
                <input
                className=' p-3 w-full h-16 border-b-2'
                type="text"
                placeholder='Front'
                value={card.front}
                onChange={(e) => handleCardChange(i, 'front', e.target.value)}
                />
                <input
                className=' p-3 w-full h-16'
                type="text"
                placeholder='Back'
                value={card.back}
                onChange={(e) => handleCardChange(i, 'back', e.target.value)}
                />
                </div>
          ))}
            </div>
          </div>
         </div>
          
    </div>
  )
}

export default EditDeckPage
import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Sidebar from '../components/Sidebar';
import { Minus, Plus, Save, Trash2 } from 'lucide-react';
import { useFlashcardStore } from '../store/flashcardStore';

const CreateDeckPage = () => {


    const {user, logout, isLoading, getDecks} = useAuthStore();
    const {deck, createDeck} = useFlashcardStore();

    const [sideBar, setSideBar] = useState(false);
    const [topic, setTopic] = useState('');
    const [cards, setCards] = useState([{front: '', back: ''}]);
    const navigate = useNavigate();

    const handleLogOut = async(e) => {
      e.preventDefault();
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.log(error)
      }
    }
    const handleSideBar = () => {
      setSideBar(!sideBar);
    }
    const handleCardChange = (i, cardSide, value) => {
      const updatedCards = [...cards];
      updatedCards[i][cardSide] = value;
      setCards(updatedCards);
    }
    const handleAddCard = () => {
      const currDeck = [...cards];
      setCards([...currDeck,{front: '', back: ''}])
    }
    const handleRemoveCard = (i) => {
      const currDeck = [...cards];
      currDeck.splice(i,1);
      setCards(currDeck);
    }

    const handleSave = async(e) => {
      //e.preventDefault();
      try {
        await createDeck(topic, cards);
        navigate('/my-decks');
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='flex flex-col min-h-screen'>
        <div className='sticky top-0 bg-[#1c1d22]'>
          <Header 
          handleLogOut={handleLogOut}
          sideBar={sideBar}
          handleSideBar={handleSideBar}
          />
        </div>
        <div className='flex flex-1'>
          {/* sidebar for desktop */}
          <div className='md:block flex-col w-60 hidden border-r-2 border-gray-500 min-h-screen'>
            <div className='sticky top-16'>
              <Sidebar />
            </div> 
          </div>
            {/* sidebar for when we are mobile and trying to access via menu button */}
            <div className={sideBar ? 'fixed top-0 left-0 z-50 ease-in-out duration-400 md:hidden w-[60%] border-r h-full bg-[#1c1d22]' 
                            : ' fixed top-0 left-[-100%] '}>
                <Sidebar />
            </div>
              <div className='flex items-center flex-col border-2 w-full'>
              <div className='flex my-[3%] font-bold text-3xl items-center justify-between border-2 max-w-md w-full p-3 sticky top-[10%] bg-[#1c1d22] rounded-2xl'>
                <h1 className=''>
                  Create Deck
                </h1>  
                 <Save 
                 className='flex items-center justify-center size-14 border-2 rounded-md bg-blue-400 hover:cursor-pointer'
                 onClick={handleSave}
                 />
                 <Plus 
                 className='flex items-center justify-center size-14 border-2 rounded-md bg-blue-400'
                 onClick={handleAddCard}
                 />
              </div>
              <div className='max-w-md w-full h-18 border-2 my-5 flex items-center rounded-2xl'>
                <input 
                placeholder='Topic'
                onChange={(e) => setTopic(e.target.value)}
                className='h-12 ml-10 w-full'
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

export default CreateDeckPage
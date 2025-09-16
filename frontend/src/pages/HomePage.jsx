import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input';
import { ArrowBigRightDash, ArrowLeft, ArrowRight, Loader, LogIn, Menu, Undo2, X } from 'lucide-react'
import { useAuthStore } from '../store/authStore.js';
import { useFlashcardStore } from '../store/flashcardStore.js';
import Sidebar from '../components/Sidebar.jsx';
//import { openAiResponse } from '../../../backend/util/openAiRequest';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';

const HomePage = () => {
 
  const navigate = useNavigate();
  const {generateDeck, generatedDeck} = useFlashcardStore();
  const {isLoading, error} = useAuthStore();

  const [topic, setTopic] = useState('Create your deku');
  const [currDeck, setCurrDeck] = useState([
    {front: 'Enter A topic or Textbook name and chapter below', back: 'Try it!'},
    {front: 'Go ahead', back: 'Give it a try!'}
  ]);
  const [flip, setFlip] = useState(false);
  const [count, setCount] = useState(0);
  const [showInput, setShowinput] = useState(true)
  const [input, setInput] = useState('')
  const [sideBar, setSideBar] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      navigate('signup');
    } catch (error) {
      console.log(error)
    }
  }
  const handleHelp = (e) => {
    e.preventDefault();
    try {
      navigate('/help');
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardFlip = () => {
    setFlip((prev) => !prev);
  }
  const handleSideBar = () => {
    setSideBar((prev) => !prev);
  }
  const handleLeft = () => {
    if(count > 0 ){
      setCount(prev => prev - 1);
      setFlip(false);
    }

  }
  const handleRight = () => {
    if(count < currDeck.length - 1){
      setCount(prev => prev + 1);
      setFlip(false);
    }
  }

  const HandleOpenAi = async(e) => {
      e.preventDefault()
      try {
        await generateDeck(input);
    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(() => {
    if(generatedDeck){
      setCurrDeck(generatedDeck)
      setCount(0);
      setFlip(false);
    }
  },[generatedDeck])

  return (
    <div className='min-h-screen'>
        <div className='h-16 border-b-1 justify-end items-center flex'>

        <p className='p-1 border-2 border-gray-100 m-2 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' 
            onClick={handleLogin}>Login</p>
        <p className='p-1 border-2 border-gray-100 m-2 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer'
            onClick={handleSignUp} >Signup!</p>
        <p className='p-1 border-2 border-gray-100 m-2 mr-5 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' 
            onClick={handleHelp}>Help</p>
        </div>

        <div className='flex justify-center'>
            <h2 className='flex m-4 text-3xl font-bold'>{topic}</h2>
        </div>
        <div className='flex flex-col justify-center items-center text-center'>
            <div className='max-w-md w-full h-80 mt-1 bg-[#00688f]/50  
                                    rounded-md overflow-auto items-center 
                                    flex justify-center'
                                    onClick={handleCardFlip}>
                    {!flip ? currDeck[count]?.front 
                        : currDeck[count]?.back}
            </div>
            <div className='flex flex-col'>
                <div className='flex max-w-md justify-around pt-3 items-center my-3 pb-2'>
                  <Button icon={ArrowLeft} color='text-red-600' onClick={handleLeft}
                  />
                  <Button icon={ArrowRight} color='text-green-600' onClick={handleRight}
                  />
                  <div className='text-sm'>
                      {count + 1}/{currDeck.length}
                  </div>
                  <button className='border-2 h-10 rounded-2xl p-3 items-center justify-center flex ml-3 hover:cursor-pointer hover:bg-blue-600/40'
                onClick={HandleOpenAi}
                >
                {!isLoading ? 'Generate Deck' : <Loader className='w-6 h-6 animate-spin' />}
                </button>
                </div>
                <Input 
                icon={ArrowBigRightDash}
                placeholder={'Input'}
                onChange={(e) => setInput(e.target.value)}
                />
                <p className='text-sm'>* Generations should take about 20-45 seconds *</p>
            </div>
            <p className='text-sm font-bold max-w-80'>Enter text above in format such like 'Genki textbook chapter 5 vocabulary' or 'Basketball terminology'</p>
        </div>
    </div>
  )
}

export default HomePage
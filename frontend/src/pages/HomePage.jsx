import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Input from '../components/Input';
import { ArrowBigRightDash, LogIn, Menu, X } from 'lucide-react'
import { useAuthStore } from '../store/authStore.js';
import { useFlashcardStore } from '../store/flashcardStore.js';
import Sidebar from '../components/Sidebar.jsx';
//import { openAiResponse } from '../../../backend/util/openAiRequest';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
 

  const navigate = useNavigate();
  const {generateDeck, generatedDeck} = useFlashcardStore();
  const {isLoading, error} = useAuthStore();


  const [currDeck, setCurrDeck] = useState([{front: 'Enter A topic or Textbook name and chapter below', back: 'bye'}]);
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

  const handleCardFlip = () => {
    setFlip((prev) => !prev);
  }
  const handleSideBar = () => {
    setSideBar((prev) => !prev);
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
    }
  },[generatedDeck])

  return (
    <div className='border-2 border-amber-400 min-h-screen'>
        <div className='h-16 border-2 justify-end items-center flex'>

        <p className='p-1 border-2 border-gray-100 m-2 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' 
            onClick={handleLogin}>Login</p>
        <p className='p-1 border-2 border-gray-100 m-2 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer'
            onClick={handleSignUp} >Signup!</p>
        <p className='p-1 border-2 border-gray-100 m-2 mr-5 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' >Help</p>
        </div>

        <div className='flex border-2 justify-center'>
            <h2 className='flex m-12 text-3xl font-bold'>Create your Deck</h2>
        </div>
        <div className='flex flex-col justify-center border-2 items-center text-center'>
            <div className='max-w-md w-full h-80 my-15 bg-[#00688f]/50  
                                    rounded-md overflow-auto items-center 
                                    flex justify-center'
                                    onClick={handleCardFlip}>
                    {!flip ? currDeck[count]?.front 
                        : currDeck[count]?.back}
            </div>
            <div className='flex'>
                <Input 
                icon={ArrowBigRightDash}
                placeholder={'Input'}
                onChange={(e) => setInput(e.target.value)}
                />
                <button className='border-2 h-10 rounded-2xl p-3 items-center justify-center flex ml-3'
                onClick={HandleOpenAi}
                >Send</button>
            </div>
            <p className='text-sm font-bold max-w-80'>Enter text above in format such like 'Genki textbook chapter 5 vocabulary' or 'Basketball terminology'</p>
        </div>
    </div>
  )
}

export default HomePage
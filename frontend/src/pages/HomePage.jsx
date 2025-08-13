import React, { useState } from 'react'
import Header from '../components/Header'
import { ArrowBigRightDash, LogIn } from 'lucide-react'
import Input from '../components/Input';



const HomePage = () => {

  const [currDeck, setCurrDeck] = useState([{front: 'Enter A topic or Textbook name and chapter below', back: 'bye'}]);
  const [flip, setFlip] = useState(false);
  const [count, setCount] = useState(0);
  const [showInput, setShowinput] = useState(true)
 
  const handleCardFlip = () => {

  }

  return (
    <div className='border-2 border-amber-400 min-h-screen'>
        <div className='h-16 border-2 justify-end items-center flex'>

        <p className='p-1 border-2 border-gray-100 m-2 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' >Login</p>
        <p className='p-1 border-2 border-gray-100 m-2 mr-5 rounded-xl text-center font-sans hover:bg-blue-600/40 hover:cursor-pointer' >Signup!</p>   
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
                />
                <button className='border-2 h-10 rounded-2xl p-3 items-center justify-center flex ml-3'>Send</button>
            </div>
            <p className='text-sm font-bold max-w-80'>Enter text above in format such like 'Genki textbook chapter 5 vocabulary' or 'Basketball terminology'</p>
        </div>
    </div>
  )
}

export default HomePage
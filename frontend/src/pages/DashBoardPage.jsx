import React from 'react'
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import { Loader, LogOut, User } from 'lucide-react';
import Button from '../components/Button';


const DashBoardPage = () => {
    const {user, logout, isLoading} = useAuthStore(); 
    const navigate = useNavigate();

    const handleLogOut = async(e) => {
      e.preventDefault();
      try {
        await logout();
        navigate('/signup');
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <div className=' h-12 justify-end flex items-center px-5 space-x-5 sticky top-0' >
      <User className='w-8 hover:cursor-pointer'/> 
      <LogOut className='h-8 w-8 hover:cursor-pointer' />
    </div>

    {/* screen */}
    <div className='flex items-center min-h-screen border-2 border-amber-300'> 

      <div className='border-r-emerald-500  w-1/12 border-2 flex flex-col min-h-screen items-center'>
        <Button name='-Search'/>
        <Button name='-Home'/>
        <Button name='-Create Deck'/>
        <Button name='-My Decks'/>
      </div>
      <div className=' w-11/12 border-2 flex min-h-screen justify-center items-center'>

      <motion.div
      initial={{opacity:0, y:-50, x:-10}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.5}}
      className='max-w-md w-full bg-[#00688f]/70 backdrop-filter backdrop-blur-xl rounded-md shadow-xl'>
          <div className=' p-5'>
              <h2 className='justify-center flex font-bold'>
                  Dashboard Page
              </h2>
              

              <div className='m-3 justify-center bg-gray-900/60 rounded-md p-2 mb-2'>
              
              <p className='text-md'>Name: {user.firstName}</p>
              <p className='text-md '>{user.lastName}</p>
              <p className='text-md '>{user.email}</p>
              </div>

              <div className='m-3 justify-center bg-gray-900/60 rounded-md p-2 mb-2'>
              <p className='text-md'> {user.lastLoginDate}</p>
              <p className='text-md '>{user.firstName}</p>
              <p className='text-md '>{}</p>
              </div>
              </div>
              <div className='bg-gray-500 h-12 flex justify-center items-center' >
                <p className='text-sm '>
                  
                  <Link onClick={handleLogOut} className='text-3xl hover:underline'>
                    Logout!
                  </Link>
                </p>
                </div>
      </motion.div>
      </div>
    </div>
    </>
  )
}
export default DashBoardPage
import React from 'react'
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';


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
    <motion.div
    initial={{opacity:0, y:-50, x:-10}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-[#00688f] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'>
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
  )
}
export default DashBoardPage
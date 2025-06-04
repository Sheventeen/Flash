import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Input from '../components/Input'
import { Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Loader } from 'lucide-react'


const ForgotPasswordPage = () => {
  const {isLoading, forgotPassword } = useAuthStore();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const handleForgotPassword = async(e) => {
    e.preventDefault();
    try {
        const response = await forgotPassword(email)
        setToken(response);
        console.log('TOKEN IN FORGOTPASSWORDPAGE:', token);
        console.log(response);
        setEmailSent(true);
    } catch (error) {
        console.log(error)
    }
  }

  const handleResetPassword = async(e) => {
    e.preventDefault();
    try {
        navigate(`/reset-password/${token}`)
        console.log(token);
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
        <div className='p-5'>
            <h2 className='text-center font-bold mb-5 text-2xl'>
                Forgot password
            </h2>

            {!emailSent ? (
                <>
                <p className='text-center text-md mb-5'>Please enter your email address and you will be sent a code</p>
                <form onSubmit={handleForgotPassword}>

                    <Input 
                    type='email'
                    icon={Mail}
                    value={email}
                    placeholder='Email Address'
                    onChange={(e) => setEmail(e.target.value)}  
                    />
                    <div className='flex justify-center'>
                        <motion.button 
                            className='my-2 inline-flex px-7 py-3 text-2xl bg-blue-900 rounded-lg shadow-lg font-bold  hover:from-blue-800 hover:to-blue-900 bg-gradient-to-r
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white focus:ring-offset-2 focus:ring-offset-gray-900'
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            type='submit'
                            //disabled={isLoading}
                            >
                            Submit
                    </motion.button>
                </div>
            </form>
            </>)    
            : 
            (
                <div className='p-5'>
                    <h2 className='text-bold mb-3 justify-center flex'>
                        Email Sent Successfully
                    </h2>
                    <p className='text-sm justify-center flex'> Click the Button to take you to verification Page</p>
                    <div className='flex justify-center mt-5'>
                        <motion.button 
                            className='mt-2 inline-flex px-7 py-3 text-2xl bg-blue-900 rounded-lg shadow-lg font-bold  hover:from-blue-800 hover:to-blue-900 bg-gradient-to-r
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white focus:ring-offset-2 focus:ring-offset-gray-900'
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            type='submit'
                            onClick={handleResetPassword}
                            disabled={isLoading}
                            >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin' />: 'Login'}
                        </motion.button>
                    </div>
                </div> 
            )}
            </div>
            <div className='bg-gray-500 h-12 flex justify-center items-center text-sm'>
                <p> Back to {
                    <Link to='/login' className='hover:underline text-sm' >
                    Login 
                    </Link>}
                </p>
            </div>

    </motion.div>
  )
}

export default ForgotPasswordPage
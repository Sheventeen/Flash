import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {User, Lock, Mail , Eye, EyeOff, Loader} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import Input from '../components/Input.jsx'
import { useAuthStore } from '../store/authStore.js';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {isAuthenticated, login, isLoading} = useAuthStore();

  const handleLogIn = async(e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center relative min-h-screen'> 
    <motion.div
    initial={{opacity:0, y:-50, x:-10}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-[#00688f] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'>
      <div className='p-5'>
        <h2 className='justify-center text-2xl text-center font-bold mb-6'>Login</h2>
        <form 
        onSubmit={handleLogIn}
        className='justify-center items-center text-sm font-thin'>

        <Input 
        icon={Mail}
        type='Email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <Input 
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          eye={showPassword ? EyeOff : Eye}
          onEyeClick={() => setShowPassword(prev => !prev)}
          />

        <div className='text-sm hover:underline'>
          
          <Link to='/forgot-password'>
            Forgot Password?
          </Link>
        </div>
        <div className='flex justify-center'>
          <motion.button 
          className='mt-2 inline-flex px-7 py-3 text-2xl bg-blue-900 rounded-lg shadow-lg font-bold  hover:from-blue-800 hover:to-blue-900 bg-gradient-to-r
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white focus:ring-offset-2 focus:ring-offset-gray-900'
          whileHover={{scale:1.05}}
          whileTap={{scale:0.95}}
          type='submit'
          disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin' />: 'Login'}
          </motion.button>
        </div>
        </form>
      </div>
      <div className='bg-gray-500 h-12 flex justify-center items-center' >
        <p className='text-sm '>
          <Link to='/' className='hover:underline' >Home</Link>
          {' '}| Don't Have an Account?{'   '}
          <Link to='/signup' className='text-sm hover:underline'>
            Sign Up!{' '}
          </Link>
        </p>
      </div>
    </motion.div>
    </div>
  )
}

export default LoginPage
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {User, Lock, Mail, Loader} from 'lucide-react';
import Input from '../components/Input.jsx'
import { useAuthStore } from '../store/authStore.js';


const SignupPage = () => {

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  
  const navigate = useNavigate();
  

  const {signup, isLoading, error} = useAuthStore()


  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, password2, lastName, firstName);
      navigate('/verify-email')
    } catch (error) {
      console.log(error);
    }
  };

  return (


    <div className='flex items-center justify-center relative min-h-screen'> 
    <motion.div 
    initial={{opacity:0, y:20}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-[#00688f] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-5 '>
        <h2 className='text-center text-[#8f95b4] mb-3 font-bold text-3xl bg-clip-text'>Create Account</h2>

          <form onSubmit={handleSignUp} className='justify-center items-center text-sm font-thin' >
            <Input 
            icon = {User}
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} /> 

            <Input 
            icon = {User}
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} /> 

            <Input 
            icon = {Mail}
            type='Email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <Input 
            icon = {Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />

            <Input 
            icon = {Lock}
            type='password'
            placeholder='Reenter Password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)} /> 
            {error && <p className='text-red-700 font-bold text-sm text-center'> {error} </p>}
            <div className='flex justify-center'>
              <motion.button className='mt-2 inline-flex px-7 py-3 text-2xl bg-blue-900 rounded-lg shadow-lg font-bold  hover:from-blue-800 hover:to-blue-900 bg-gradient-to-r
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-white focus:ring-offset-2 focus:ring-offset-gray-900'
              whileHover={{scale:1.05}}
              whileTap={{scale:0.95}}
              type='submit'
              disabled={isLoading}
              > 
              {isLoading ? <Loader className='w-6 h-6 animate-spin'/> :'Sign up'}
              </motion.button>
            </div>
          </form>
      </div>
      <div className='px-8 py-4 bg-gray-600 bg-opacity-50 flex justify-center'>
        <p className='text-sm'>
          <Link to='/' className='hover:underline' >Home</Link>
          {' '} | Already Have an Account?{'       '}  
          <Link to={'/login'} className='hover:underline'>
          Login 
          </Link>
        </p> 


      </div>
    </motion.div>
    </div>
  )
}

export default SignupPage
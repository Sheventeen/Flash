import React, { useState } from 'react';
import {motion} from 'framer-motion';
import Input from '../components/Input';
import { Braces, Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';



const VerifyEmailPage = () => {

    const [code, setCode] = useState('');
    const {verifyEmail, error, isLoading, isAuthenticated } = useAuthStore()
    const navigate = useNavigate();


    const setChange = (e) => {
        const newValue = e.target.value;
        if(newValue.length <= 8){
            setCode(newValue)
        }
        
    }
    const handleKeyDown = (e) => {
        if (code.length === 8 && e.key !== 'Backspace' && e.key !== 'Delete'){
            e.preventDefault();
        }
    }
    const handleVerify = async(e) => {
        e.preventDefault();
        try {
            console.log("Verifying code:", code);
            await verifyEmail(code);
            console.log("Verification successful, navigating...");
            navigate('/dashboard');
        } catch (error) {
            console.log(error)
        }

        console.log(`you submited code of ${code}` );
    }

  return (
    <div className='flex items-center justify-center relative min-h-screen'> 
    <motion.div initial={{opacity:0, y:-50, x:-10}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-[#00688f] bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'>
        <div className='p-5'>
            <h2 className='text-2xl text-center'>
                Enter Verification Code
            </h2>

            <form onSubmit={handleVerify}>

                <Input 
                icon={Braces}
                type='text'
                placeholder='Enter Code'
                value={code}
                onChange={setChange}
                onKeyDown={handleKeyDown}
                />
                <div className='flex justify-center'>
                    <motion.button className='flex hover:cursor-pointer py-3 px-6 bg-gray-900 rounded-md'
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    type='submit'
                    disabled={isLoading}
                    >
                    {isLoading ? <Loader className='w-6 h-6 animate-spin' />: 'Verify'}
                    </motion.button>
                </div>
                    {error && <p className='text-red-700 text-sm font-bold flex justify-center text'>{error}</p>}
            </form>
        </div>
    </motion.div>
    </div>
  )
}

export default VerifyEmailPage
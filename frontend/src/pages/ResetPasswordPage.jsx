import React from 'react';
import {motion} from 'framer-motion';
import Input from '../components/Input';
import { Eye, EyeOff, Loader, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useParams } from 'react-router-dom';



const ResetPasswordPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isReset, setIsReset] = useState(false);
    const {resetToken} = useParams();


    const {isLoading, resetPassword, error} = useAuthStore();


    const handleResetPassword = async(e) => {
        e.preventDefault();
        try {
            await resetPassword(resetToken, password, password2);
            setIsReset(true);
        } catch (error) {
            console.log(error)
        }
    }

  return (
        <motion.div 
            initial={{opacity:0, y:-50, x:-10}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.5}}
            className='max-w-md w-full bg-[#00688f]/70 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-xl overflow-hidden'>

                {!isReset ? (
                    <> 
                    <div className='p-5'>
                        <h2 className='text-md flex justify-center font-bold'>
                            Reset Password
                        </h2>
                        <form onSubmit={handleResetPassword}> 
                            <Input 
                                icon={Lock}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                eye={showPassword ? EyeOff : Eye}
                                onEyeClick={() => setShowPassword(prev => !prev)}
                                />
                            <Input 
                                icon={Lock}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                eye={showPassword ? EyeOff : Eye}
                                onEyeClick={() => setShowPassword(prev => !prev)}
                                />
                            <div className='flex justify-center'>
                            <motion.button 
                                className='
                                  mt-2 inline-flex px-7 py-3 text-2xl bg-blue-900 rounded-lg shadow-lg font-bold 
                                 hover:from-blue-800 hover:to-blue-900 bg-gradient-to-r
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  transition text-white focus:ring-offset-2 focus:ring-offset-gray-900'
                                whileHover={{scale:1.05}}
                                whileTap={{scale:0.95}}
                                type='submit'
                                disabled={isLoading}
                                >
                                {isLoading ? <Loader className='w-6 h-6 animate-spin' />: 'Reset'}
                            </motion.button>
                            </div>
                        </form>    
                    </div>
                    </>
                ) : 
                (
                    <>  
                    <div className='p-5'>
                        <h2 className='flex justify-center font-bold mb-20'>
                            Password Successfully Reset
                        </h2>
                        </div>
                        <div className=' bg-gray-800 text-sm flex justify-center p-3'>
                            <p> Back to&nbsp; </p>
                            <Link to='/login' className=' hover:underline' >  {' '}Login </Link>
                        </div>
                    </>
                )
            }
            
        </motion.div>
  )
}

export default ResetPasswordPage
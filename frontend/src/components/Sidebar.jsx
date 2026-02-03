import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
//  generates our sidebar to be used during page navigations
const Sidebar = () => {
    const navigate = useNavigate();
    const handleClick = (path) => {
        toast.dismiss();
        navigate(path);
      }
      const handleToast = (message) => {
        toast.dismiss();
        toast(
          message,
          {
            icon: '✉️',
            duration: 3000,
            style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
            fontSize: '14px',
            padding: '8px 12px',
            maxWidth: '300px'
          }
        }
        )
      }
    
  return (
    <ul className='mt-5 flex flex-col items-center'>
        {/* <li onClick={() => handleClick('/search')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Search</li> */}
        <Toaster position='top-center' toastOptions={{limit: 1,}}/>
        <li onClick={() => handleClick('/dashboard')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Home</li>
        <li onClick={() => handleClick('/create-deck')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Create Deck</li>
        <li onClick={() => handleClick('/my-decks')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>My Decks</li>
        <li onClick={() => handleToast('Message flashcardappli@gmail.com')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Contact</li>
        <li onClick={() => handleToast('Message flashcardappli@gmail.com')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Help</li>
    </ul>
  )

}
export default Sidebar
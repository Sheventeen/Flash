import React from 'react'
import { useNavigate } from 'react-router-dom';
 
const Sidebar = () => {

    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      }
    
  return (
    <ul className='mt-5 flex flex-col items-center'>
        <li onClick={() => handleClick('/search')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Search</li>
        <li onClick={() => handleClick('/dashboard')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Home</li>
        <li onClick={() => handleClick('/create-deck')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Create Deck</li>
        <li onClick={() => handleClick('/my-decks')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>My Decks</li>
        <li onClick={() => handleClick('/contact')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Contact</li>
        <li onClick={() => handleClick('/help')} className='p-3 border-b border-gray-700 hover:cursor-pointer hover:bg-gray-600'>Help</li>
    </ul>
  )

}
export default Sidebar
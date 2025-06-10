import React, { useState } from 'react'
import Header from '../components/Header'
import { LogOut, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const CreateDeckPage = () => {


    const {user, logout, isLoading, getDecks} = useAuthStore();
    const [sideBar, setSideBar] = useState(false);
    const navigate = useNavigate();


    const handleLogOut = async(e) => {
      e.preventDefault();
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.log(error)
      }
    }
    const handleSideBar = () => {
      setSideBar(!sideBar);
    }


  return (
    <div className='flex flex-col h-screen'>
        <Header 
        onClick={handleLogOut}
        sideBar={sideBar}
        handleSideBar={handleSideBar}
        />
    </div>
  )
}

export default CreateDeckPage
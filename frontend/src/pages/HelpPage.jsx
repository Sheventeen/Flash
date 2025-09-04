import { LogOut, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'

const HelpPage = () => {
  const [sideBar, setSideBar] = useState() 

  const handleSideBar = () => {

  }
  const handleLogOut = () => {
    
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='h-16 items-center justify-end flex border-b-2 border-gray-500'>
          <div onClick={handleSideBar}>
            {!sideBar ? <Menu className='size-6 font-bold md:hidden flex' /> : <X className='size-6 font-bold md:hidden flex' />}
          </div>
          <LogOut className='m-5 size-6 hover:cursor-pointer' onClick={handleLogOut} /> 
      </div>
        <div className='flex flex-1'>

          <div className=' md:flex flex-col w-60 hidden border-r-2 border-gray-500'>
            <Sidebar />
          </div>

          <div className={sideBar ? 'fixed top-0 left-0 z-50 ease-in-out duration-400 md:hidden w-[60%] border-r h-full bg-[#1c1d22]' 
                          : ' fixed top-0 left-[-100%] '}>
              <Sidebar />
          </div>
        </div>
    </div>
  )
}

export default HelpPage
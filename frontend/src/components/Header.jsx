import React from 'react'
import { LogOut, Menu, X } from 'lucide-react'

const Header = ({handleLogOut, handleSideBar, sideBar}) => {
  return (
    <div className='h-16 items-center justify-end flex border-b-2 border-gray-500'>
          <div onClick={handleSideBar}>
            {!sideBar ? <Menu className='size-6 font-bold md:hidden flex' /> : <X className='size-6 font-bold md:hidden flex' />}        
          </div>
          <LogOut className='m-5 size-6 hover:cursor-pointer' onClick={handleLogOut} /> 
      </div>
  )
}

export default Header
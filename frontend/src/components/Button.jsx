import React from 'react'

const Button = ({icon: Icon, color = '', size = 'size-16', onClick}) => {
  return (
    <button
    onClick={onClick}
    className={`flex items-center border-gray-200 justify-center border-4 ${color} h-16 w-24 rounded-xl p-2 hover:cursor-pointer`}>
        <Icon className={size}/>
    </button>
  )
}

export default Button
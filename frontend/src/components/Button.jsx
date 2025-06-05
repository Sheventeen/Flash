import React from 'react'

const Button = (props) => {
  return (
    <>
      <button 
        className='flex py-5 hover:bg-gray-600/50 items-center 
        justify-center rounded-2xl w-full max-w-md
        text-lg hover:cursor-pointer' 
        >
        {props.name}
      </button>
    <div className='h-0.5 bg-gray-500 rounded-3xl w-[92%] mt-1'/>

      </>
  )
}

export default Button
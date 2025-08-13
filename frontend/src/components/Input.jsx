import React from 'react'

const Input = ({icon:Icon,eye:Eye, onEyeClick, ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className='size-5 text-[#00688f]'/>
        </div>

        <input className='w-full pl-10 pr-3 py-2 bg-[#1c1d22] bg-opacity-50 rounded-lg border border-gray-700 focus:border-[#00688f] focus:ring-2 
        focus:ring-[#00688f] text-white placeholder-gray-500 transition duration-200 text-xl'
        {...props} />
        
        {Eye && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={onEyeClick}
              >
            <Eye className='size-5 text-[#00688f]'/>
        </div>
)}
    </div>
    
  )
}

export default Input
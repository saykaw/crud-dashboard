import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs';
import { LuMessageSquareMore } from 'react-icons/lu';
import { PiSlidersHorizontalBold } from 'react-icons/pi';
import { FaRegBell } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';

const Navbar = () => {
    return (
      <nav className='bg-gray-50 px-6 py-4 flex justify-between'>
          <div className='flex items-center text-l'>
              <div className='relative w-full md:w-[600px]'>
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'> 
                      <button className='p-1 focus:outline-none text-white md:text-gray-600'><IoIosSearch/></button>
                  </span>
                  <input type='text' placeholder='Search your course' className='w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block' />
              </div>
          </div>
          <div className='flex items-center gap-x-9'>
  
              <div className='text-gray-500 cursor-pointer hover:text-gray-800'>
                  <BsQuestionCircle className='w-6 h-6'/>
              </div>
  
              <div className='text-gray-500 cursor-pointer hover:text-gray-800 '>
                  <LuMessageSquareMore className='w-6 h-6'/>
              </div>
  
              <div className='text-gray-500 cursor-pointer hover:text-gray-800'>
                  <PiSlidersHorizontalBold className='w-6 h-6'/>
              </div>
  
              <div className='text-gray-500 cursor-pointer hover:text-gray-800'>
                  <FaRegBell className='w-6 h-6'/>
              </div>
  
              <div className='flex'>
                  <img className='w-13 h-12 rounded' src='woman-smiling.jpg' />
                  <div className='text-black font-bold py-3 px-5 tracking-wide '> Adeline H. Dancy </div>
              </div>
  
          </div>
      </nav> 
    )
  }

export default Navbar;

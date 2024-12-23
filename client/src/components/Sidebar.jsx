import React from 'react'
import { RiDashboard3Line } from "react-icons/ri";
import { MdMenuBook } from "react-icons/md";
import { IoMdBookmarks } from "react-icons/io";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlinePieChart } from "react-icons/ai";
import { RiSettingsLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className='w-64 bg-white fixed h-full px-4 py-2'>
        <div className='my-5 mb-5 text-xl flex' >
            < img className='w-11 h-11' src='logo.png'/>
            <h1 className='text-black text-3xl font-bold'>Quyl.</h1> 
        </div>
        <ul className='mt-3 text-gray-500 tracking-wide font-semibold'>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <RiDashboard3Line className='inline-block w-6 h-6 mr-2 -mt-2'></RiDashboard3Line>
                    Dashboard
                </a>
            </li>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <MdMenuBook className='inline-block w-6 h-6 mr-2 -mt-2'></MdMenuBook>
                    Students
                </a>
            </li>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <IoMdBookmarks className='inline-block w-6 h-6 mr-2 -mt-2'></IoMdBookmarks>
                    Chapter
                </a>
            </li>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <BsQuestionCircle className='inline-block w-6 h-6 mr-2 -mt-2'></BsQuestionCircle>
                    Help
                </a>
            </li>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <AiOutlinePieChart className='inline-block w-6 h-6 mr-2 -mt-2'></AiOutlinePieChart>
                    Reports
                </a>
            </li>
            <li className='mb-5 rounded hover:text-black hover:bg-gray-200 py-2'>
                <a href='' className='px-3'>
                    <RiSettingsLine className='inline-block w-6 h-6 mr-2 -mt-2'></RiSettingsLine>
                    Settings
                </a>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar
  
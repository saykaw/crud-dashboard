import React from 'react'
import Navbar from './Navbar'
import StudentTable from './StudentTable'


const Dashboard = () => {
    return (
        <div className='w-full bg-gray-50 min-h-screen flex flex-col'>
        <Navbar />
        <div className='flex-1 p-6'>
          <div className='w-full max-w-7xl bg-white p-6 rounded shadow-md overflow-x-auto'>
            <StudentTable />
          </div>
        </div>
      </div>
    );
  };

export default Dashboard
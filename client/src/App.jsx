import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 ml-64'>
        <Dashboard />
      </div>
    </div>
  );
};

export default App;

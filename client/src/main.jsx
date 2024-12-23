import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';  
import store from './store';  // Import the store
import React from 'react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* Wrap the App in the Provider */}
    <App />
  </Provider>,
)

// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';  // Import createRoot from "react-dom/client"
import router from './router.jsx';
import { ContextProvider } from './context/ContextProvider.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
       <RouterProvider router={router}/>
    </ContextProvider>

  </React.StrictMode>
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: '"DM Sans", sans-serif',
            background: '#2C1F0E',
            color: '#F7F0E3',
            border: '1px solid #C9A84C44',
            borderRadius: '2px',
          },
          success: { iconTheme: { primary: '#C9A84C', secondary: '#2C1F0E' } },
          error: { iconTheme: { primary: '#E06666', secondary: '#2C1F0E' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)

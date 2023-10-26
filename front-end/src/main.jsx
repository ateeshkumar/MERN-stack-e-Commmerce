import React from 'react'
import './index.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'antd/dist/reset.css';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  
)

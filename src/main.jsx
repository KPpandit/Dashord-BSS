import React, { Children, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  BrowserRouter
} from "react-router-dom";
import { TokenProvider } from './TokenContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <TokenProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </TokenProvider>
  </React.StrictMode>

)

import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import VerificationPage from './pages/VerificationPage'
import Register from './pages/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/verification' element={<VerificationPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

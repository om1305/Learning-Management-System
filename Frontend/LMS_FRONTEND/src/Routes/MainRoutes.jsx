import Login from '@/Pages/Auth/Login'
import Register from "@/Pages/Auth/Register";
import Home from '@/Pages/users/Home';
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/' element={<Home />}/>
        
    </Routes>
  )
}

export default MainRoutes
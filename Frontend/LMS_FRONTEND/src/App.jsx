import React from 'react'
import MainRoutes from './Routes/MainRoutes'
import NavBar from './components/ui/NavBar'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const hiddenRoute = ['/login','/register']
  return (
    <div>
      <NavBar/>
      <MainRoutes/>
    </div>
  )
}

export default App
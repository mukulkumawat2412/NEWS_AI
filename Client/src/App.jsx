import React from 'react'
import Navbar from './Comp/Navbar'
import '@mantine/core/styles.css';
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';



function App() {
  return (
    <>
     <Navbar/>   
    <Routes>
      <Route path='/login' element={<Login/> }/>
    </Routes>
     
    
    </>
   
  )
}

export default App

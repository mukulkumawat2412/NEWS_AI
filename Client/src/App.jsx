import React, { useEffect ,lazy, Suspense} from 'react'
import Navbar from './Comp/Navbar'
import '@mantine/core/styles.css';
import { Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import Signup from './pages/Register.jsx';
import {Toaster} from "sonner"
// import HomePage from './pages/HomePage.jsx';
import ProtectedRoute from './Comp/ProtectedRoute.jsx';
import LoadingSpinner from './Comp/LoadingSpinner.jsx';
import PreferenceProtectRoute from './Comp/PreferenceProtectRoute.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import NewsPage from './pages/NewsPage.jsx';

const HomePage = lazy(()=>

  import("./pages/HomePage.jsx")

)
const Profile = lazy(()=>import("./pages/Profile.jsx"))



function App() {



  
  
  





  return (
    <>
    <Toaster richColors position='bottom-center'/>

      <Suspense fallback={<div><LoadingSpinner/></div>}>

     <Navbar/>  
   
    <Routes>
    <Route element={<ProtectedRoute/>}>

    <Route path='/profile' element={<Profile/>}/>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/news' element={<NewsPage/>}/>
    <Route element={<PreferenceProtectRoute/>}>

    <Route path='/preferences' element={<Preferences/>}/>

    </Route>


    </Route>
      <Route path='forgot-password' element={<ForgetPassword/>}/>

      <Route path='/login' element={<Login/> }/>
      <Route path='/register' element={<Signup/>}/>
    </Routes>
    </Suspense>
    
    </>
   
  )
}

export default App

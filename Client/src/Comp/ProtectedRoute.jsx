import React from 'react'
import { getCookie } from '../utils/utils.js'
import { Navigate, Outlet } from 'react-router-dom'



function ProtectedRoute() {

    const isAuthenticated = getCookie("isAuthenticated")

    if(!isAuthenticated){
        return <Navigate to={"/login"}/>
    }





  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoute

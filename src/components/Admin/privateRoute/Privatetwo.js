import React from 'react'
import { Navigate } from 'react-router-dom'

 const Private = ({children}) => {
  const isAuth = localStorage.getItem("admin")
  return isAuth ? children : <Navigate to="/"/>
}

export default Private
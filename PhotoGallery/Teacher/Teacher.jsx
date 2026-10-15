import React from 'react'
import { Link, Outlet } from "react-router-dom"
import "../CSS/App.css"

function Teacher() {
  
    
  return (
    
    <div className='Main_admin'>
       
        <Outlet />   
      </div>
    
  )
}

export default Teacher;
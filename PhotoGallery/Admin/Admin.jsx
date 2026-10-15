import React from 'react'
import { Link, Outlet } from "react-router-dom"


function Admin() {
  
    
  return (
    
    <div className='Main_admin'>
         <Outlet /> 
    </div>
  )
}

export default Admin
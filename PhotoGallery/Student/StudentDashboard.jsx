import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "../CSS/AdminDashBoard.css"; 

function StudentDashboard() {
  return (
    <div className="AdminDashboard">
    
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>Student Portal</h2>
        </div>
        <div className="dashboard-links">
          <Link to="/student/profile"><h3>👤 My Profile</h3></Link>
          <Link to="/student/album"><h3>📸 View Albums</h3></Link>
          
          
        </div>
      </div>

     
      <div className="main-content">
        <div className="top-header">
          <h2>Student Portal Dashboard</h2>
          <p>View your profile, school albums.</p>
        </div>
        <div className="dashboard-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
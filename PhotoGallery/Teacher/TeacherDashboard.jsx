import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "../CSS/AdminDashBoard.css"; 

function TeacherDashboard() {
  return (
    <div className="AdminDashboard">
      

      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>Teacher Panel</h2>
        </div>
        <div className="dashboard-links">
          <Link to="/teacher/profile"><h3>👤 My Profile</h3></Link>
          <Link to="/teacher/student"><h3>👨‍🎓 My Students</h3></Link>
          <Link to="/teacher/album"><h3>📸 Albums</h3></Link>
         
        </div>
      </div>


      <div className="main-content">
        <div className="top-header">
          <h2>Welcome, Teacher</h2>
          <p>Manage your profile, view students, and manage albums.</p>
        </div>
        <div className="dashboard-content">
          <Outlet /> 
        </div>
      </div>

    </div>
  );
}

export default TeacherDashboard;
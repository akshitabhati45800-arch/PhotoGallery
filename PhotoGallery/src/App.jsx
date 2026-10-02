import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import '../CSS/App.css';

function App() {
  const location = useLocation();

  return (
    <div className="HeroPage">
      

      <nav className="navbar">
        <h3 className="logo">PhotoGallery</h3>
        
      </nav>


      <div className="page-content">
        
       
        {location.pathname === "/" ? (
          <div className="portal-grid">
            
            <div className="portal-card">
              <h4>Admin </h4>
              <p>Manage the gallery Admin</p>
              <Link to="/admin/signup" className="btn admin-btn">Open Admin</Link>
            </div>

            <div className="portal-card">
              <h4>Student </h4>
              <p>View images and collection</p>
              <Link to="/student/signin" className="btn standard-btn">Open Student</Link>
            </div>

            <div className="portal-card">
              <h4>Teacher Studio</h4>
              <p>Get to student</p>
              <Link to="/teacher/signin" className="btn standard-btn">Open Teacher</Link>
            </div>

          </div>
        ) : (
         
          <Outlet />
        )}

      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { Link, Outlet } from "react-router-dom";
import "../CSS/AdminDashBoard.css";

function AdminDashboard() {
  return (
    <div className="AdminDashboard">
      
      <div className="sidebar">
        <div className="sidebar-brand">
          <h2>Admin Panel</h2>
        </div>
        <div className="dashboard-links">
          <Link to="/admin/teacher">
            <h3>👨‍🏫 Teachers</h3>
          </Link>
          <Link to="/admin/student">
            <h3>👨‍🎓 Students</h3>
          </Link>
          <Link to="/admin/album">
            <h3>📸 Albums</h3>
          </Link>
        </div>
      </div>

      {/* Right Main Content Area */}
      <div className="main-content">
        <div className="top-header">
          <h2>Welcome, Admin</h2>
          <p>Manage teachers, students, and photo albums.</p>
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../CSS/Profile.css";
import "../CSS/App.css"
function Profile_student() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/student/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudentData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="profileLoading">
        <p>Loading your profile details...</p>
      </div>
    );
  }

  return (
    <div className="StudentProfile">
      <div className="welcomeBanner">
        <h1>Welcome Back, {studentData?.name || "Student"}! 👋</h1>
        
      </div>

      <div className="profileGrid">
        <div className="profileCard">
          <h2>Student Profile</h2>
          <div className="cardContent">
            <p><strong>Name:</strong> {studentData?.name}</p>
            <p><strong>Username:</strong> {studentData?.username}</p>
            <p><strong>Email:</strong> {studentData?.email}</p>
            <p><strong>Role:</strong> <span className="roleBadge">{studentData?.role}</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile_student;
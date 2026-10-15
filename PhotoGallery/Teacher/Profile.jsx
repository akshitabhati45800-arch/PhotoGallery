import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../CSS/Profile.css";

function Profile() {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/teacher/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeacherData(res.data.teacher);
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
    <div className="ProfilePanel">
      <div className="welcomeBanner">
        <h1>Welcome Back, {teacherData?.name }</h1>
        <p>Profile..</p>
      </div>

      <div className="profileGrid">
        <div className="profileCard">
          <h2>Teacher Profile</h2>
          <div className="cardContent">
            <p><strong>Name:</strong> {teacherData?.name}</p>
            <p><strong>Username:</strong> {teacherData?.username}</p>
            <p><strong>Email:</strong> {teacherData?.email}</p>
            <p><strong>Role:</strong> <span className="role">{teacherData?.role}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
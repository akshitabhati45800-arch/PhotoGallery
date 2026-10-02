import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/TeacherData.css"
function Teacher_admin() {
  const [teachers, setTeachers] = useState([]);
  const [create, setCreate] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");
  console.log(token);
  // Get all teachers
  const getTeachers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/admin/viewTeacher",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setTeachers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  // Delete Teacher
  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/deleteTeacher/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTeachers();
    } catch (err) {
      console.log(err);
    }
  };

  // Create Teacher
  const CreateTeacher = async () => {
    try {
      await axios.post(
        "http://localhost:3000/admin/createTeacher",
        {
          name,
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreate(false);
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      getTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Teacher_admin">
      <h1>Teacher Management</h1>

      <button onClick={() => setCreate(true)}>Add New Teacher</button>

      {create && (
        <div className="addNew">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={CreateTeacher}>Save</button>
          <button onClick={() => setCreate(false)}>Cancel</button>
        </div>
      )}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.username}</td>
              <td>
                <button onClick={() => deleteTeacher(teacher._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teacher_admin;
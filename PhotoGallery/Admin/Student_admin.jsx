import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/StudentData.css"

function Student_admin() {
  const [students, setStudents] = useState([]);
  const [create, setCreate] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [standarad, setStandarad] = useState(0);

  const token = localStorage.getItem("token");

  // Get all students
  const getStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/admin/viewStudent",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, [token]);

  // Delete Student
  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/deleteStudent/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Student deleted successfully");
     setStudents(prev => prev.filter(student => student._id !== studentId)
);        
     
    } catch (err) {
      console.log(err);
    }
  };

  // Create Student
  const CreateStudent = async () => {
    try {
     const response= await axios.post(
        "http://localhost:3000/admin/createStudent",
        {
          name,
          username,
          email,
          password,
          standarad,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Student created successfully");
      setCreate(false);
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setStandarad(0);
       getStudents(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Student_admin">
      <h1>Student Management</h1>

      <button onClick={() => setCreate(true)}>Add New Student</button>

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
          <input
            type="number"
            placeholder="Standard"
            value={standarad}
            onChange={(e) => setStandarad(e.target.value)}
          />
          <button onClick={CreateStudent}>Save</button>
          <button onClick={() => setCreate(false)}>  Cancel
          </button>
        </div>
      )}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Standard</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.username}</td>
              <td>{student.standarad}</td>
              <td>
                <button onClick={() => deleteStudent(student._id)}>
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

export default Student_admin;
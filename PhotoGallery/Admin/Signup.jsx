import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "../CSS/Signup.css"
function Signup() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  async function handleSignup() {
    try {
      const response = await axios.post("http://localhost:3000/admin/signup", {
        username,
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/admin");   

    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  }

  return (
     <div className="container">
    <div className='signup'>
      <h1>Signup</h1>
      <input type="text"
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input type="email"
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password"
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSignup}>
        GetStarted
      </button>
      <Link to="/admin/Signin">
        Account already exist?
      </Link>
    </div>
    </div>
  )
}

export default Signup;
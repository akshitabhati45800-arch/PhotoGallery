import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import  "../CSS/Signin.css"
function Signin_teacher() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  async function handleSignin() {
    try {
      const response = await axios.post("http://localhost:3000/teacher/signin", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/teacher");

    } catch (error) {
      console.log(error);
      alert("Signin failed");
    }
  }

  return (
     <div className="content">

    
    <div className='login-container'>
      <h1>Signin</h1>
      <input type="email"
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input type="password"
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSignin}>
        GetStarted
      </button>
      
    </div>
     </div>
  )
}

export default Signin_teacher
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {

  const API_URL = 'http://localhost:5000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('You have registered successfully!');
        }
      })
      .catch(error => {
        alert(error.toString());
      });
  };

  const navigate = useNavigate();

  function handleClick(){
    navigate("/")
  }

  return(
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className= "register-form" onSubmit={handleSubmit} >
        <label htmlFor="name">Full name</label>
        <input type= "name" name="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Username"/>
        <label htmlFor="password">password</label>
        <input type="password" name= "password" value= {password} onChange={event => setPassword(event.target.value)}  placeholder="*********"/>
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick= {handleClick} >Already have an account? Login here.</button>
    </div>
  )
}

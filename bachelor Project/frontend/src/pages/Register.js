import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Footer from "../footer";
import Navbar from "../Navbar";

export const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [KategorieSet, setKategorieSet] = useState({});

  function handleSubmit(event) {

//     event.preventDefault();
//    //get kategories
//     axios.get('http://localhost:5000/getkategories').then(response => {
//      console.log("SUCCESS", response)
//      setKategorieSet(response)
//    }).catch(error => {
//      console.log(error)
//    })
//
//    event.preventDefault();
//    for(let i=0; i<KategorieSet.data.length; i++)
//    {
//    let init_leistung = {username: username, kategorie: KategorieSet.data[i].kategorie}
//
//    const requestOptions = {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(init_leistung)
//    };
//    fetch('http://localhost:5000/leistung', requestOptions)
//        .then(response => response.json())
//        .then(init_leistung);
//    }



    event.preventDefault();
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('You have registered successfully!');
           localStorage.setItem("password", data.password)
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
    <div >


      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <div  className="auth-form-container">

          <h2>Register</h2>
          <form className= "register-form" onSubmit={handleSubmit} >
            <label htmlFor="name">Full name</label>
            <input type= "name" name="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Username"/>
            <label htmlFor="password">password</label>
            <input type="password" name= "password" value= {password} onChange={event => setPassword(event.target.value)}  placeholder="*********"/>
            <button type="submit">Register</button>
            <label htmlFor="test">{}</label>
          </form>
          <button className="link-btn" onClick= {handleClick} >Already have an account? Login here.</button>

        </div>

        </div>


      <div>
        <Footer />
      </div>
    </div>
  )
}

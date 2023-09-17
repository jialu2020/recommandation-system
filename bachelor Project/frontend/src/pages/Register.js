import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../footer";
import "./Register.css";

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('recommendation'); // 'recommendation' is the default user type
  const [error, setError] = useState(null);
  const [privacyPolicyConfirmed, setPrivacyPolicyConfirmed] = useState(false);
  const [cookiePolicyConfirmed, setCookiePolicyConfirmed] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
     const api = "http://www.indilearnlj.de/api/register"
     const api2 = "http://localhost:5000/api/register"
    event.preventDefault();

    if (!privacyPolicyConfirmed || !cookiePolicyConfirmed) {
      alert("Please confirm both Privacy Policy and Cookie Policy.");

      return;
    }

    axios.post(api2, {
      username,
      password,
      userType,
    })
      .then(response => {
        const data = response.data;
        if (data.error) {
          alert(data.error);
        } else {
          alert('You have registered successfully!');
          localStorage.setItem("password", data.password);
          navigate("/");
        }
      })
      .catch(error => {
        alert(error.toString());
      });
  };
  return (
    <div>
      <div className="container">
        <div className="auth-form-container">
          <h2 style={{textAlign: 'left', marginBottom: '10px'}}>Register</h2>
          <p style={{fontWeight: '500', marginBottom: '20px'}}>einfach und schnell.</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-container">
              {/* Username input */}
              <input
                style={{marginBottom: '15px'}}
                type="text"
                name="username"
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Username"
              />
              {/* Password input */}
              <input
                type="password"
                name="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
              />
            </div>
             {/* 用户类型选项 */}
            {/*<div className="user-type-container">*/}
            {/*  <label>*/}
            {/*    <input type="radio" name="userType" value="normal" checked={userType === 'normal'} onChange={() => setUserType('normal')} />*/}
            {/*    Normal User*/}
            {/*  </label>*/}
            {/*  <label>*/}
            {/*    <input type="radio" name="userType" value="recommendation" checked={userType === 'recommendation'} onChange={() => setUserType('recommendation')} />*/}
            {/*    Recommendation System User*/}
            {/*  </label>*/}
            {/*</div>*/}
            <button type="submit" >
              Anmelden
            </button>
          </form>
          <div className="policy-checkbox">
            <label>
              <span>Ich akzeptiere die </span>{" "}
              <a className="link-btn" href="/privacy-policy">
                Privacy Policy
              </a>
              <input
                type="checkbox"
                checked={privacyPolicyConfirmed}
                onChange={() => setPrivacyPolicyConfirmed(!privacyPolicyConfirmed)}
              />
            </label>
          </div>

          <div className="policy-checkbox">
            <label>
              <span>Ich akzeptiere die </span>{" "}<a className="link-btn" href="/cookie-policy">
                 Cookie Policy
              </a>
              <input
                type="checkbox"
                checked={cookiePolicyConfirmed}
                onChange={() => setCookiePolicyConfirmed(!cookiePolicyConfirmed)}
              />
            </label>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

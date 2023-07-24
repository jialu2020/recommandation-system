import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../footer";
import "./Register.css";

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('normal'); // 'normal' is the default user type
  const [error, setError] = useState(null);
  const [privacyPolicyConfirmed, setPrivacyPolicyConfirmed] = useState(false);
  const [cookiePolicyConfirmed, setCookiePolicyConfirmed] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!privacyPolicyConfirmed || !cookiePolicyConfirmed) {
      alert("Please confirm both Privacy Policy and Cookie Policy.");
      return;
    }

    axios.post('http://localhost:5000/api/register', {
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
      <div className="container"> {/* 外部容器，用于居中显示 */}
        <div className="auth-form-container"> {/* 注册表单容器 */}
          <h2 style={{ textAlign: 'left' }}>Register</h2>
          <p style={{ fontWeight: 'bold' }}>It's quick and easy.</p>
          <form className="register-form" onSubmit={handleSubmit}>
            {/* 输入字段 */}
           <input
      type="name"
      name="username"
      value={username}
      onChange={event => setUsername(event.target.value)}
      placeholder="Username" // Placeholder for Username
    />
    <input
      type="password"
      name="password"
      value={password}
      onChange={event => setPassword(event.target.value)}
      placeholder="Password" // Placeholder for Password
    />

            {/* 用户类型选项 */}
            <div className="user-type-container">
              <label>
                <input type="radio" name="userType" value="normal" checked={userType === 'normal'} onChange={() => setUserType('normal')} />
                Normal User
              </label>
              <label>
                <input type="radio" name="userType" value="recommendation" checked={userType === 'recommendation'} onChange={() => setUserType('recommendation')} />
                Recommendation System User
              </label>
            </div>

            {/* 注册按钮 */}
            <button type="submit">Register</button>
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {/* 隐私政策和 Cookie 政策链接按钮 */}
            <button className="link-btn" onClick={() => setPrivacyPolicyConfirmed(window.confirm("Are you sure you want to confirm the Privacy Policy?"))}>
              Privacy Policy
            </button>
            <button className="link-btn" onClick={() => setCookiePolicyConfirmed(window.confirm("Are you sure you want to confirm the Cookie Policy?"))}>
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

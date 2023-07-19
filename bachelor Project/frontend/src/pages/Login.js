import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";

//props形参 父组件发送一些函数或值给他们的children,
export const Login = () => {
  //创建状态 email是状态的名字 然后setEmailHook是一个函数来修改状态 最开始都是null所以使用''
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //用户提交表单  handleSubmit函数负责
  function handleSubmit(event) {
    event.preventDefault();

    // Send a request to the backend to check the login credentials
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Login successful, store the token in local storage
          localStorage.setItem('token', data.token );
          localStorage.setItem('username', data.username );
          localStorage.setItem('password', data.password );


          // Redirect the user to the home page
          setIsLoggedIn(true); // 登录成功时设置为true
          setTimeout(() => {
            navigate('/homepage');
          }, 1000);
          console.log('isLoggedIn1:', isLoggedIn);

        } else {
          // Login failed, display an error message
          alert(data.message);
        }
      })
      .catch((error) => {
        alert('An error occurred while logging in');
      });
  }

  useEffect(() => {
    console.log('isLoggedIn2: useEffect triggered. isLoggedIn value:', isLoggedIn);
  }, [isLoggedIn]);




  const handleRedirect = () => {
    navigate("/register");
  };

  return(

    <div>


      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'  }}>
        <div className="auth-form-container">
          <h2>Welcome to Indilearn!</h2>

          <form className= "login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input value= {username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="your username" id="username" name= "username"/>
            <label htmlFor="password">password</label>
            <input value= {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name= "password"/>
            <button type="submit">Log In</button>
          </form>
          <button className="link-btn" onClick= {handleRedirect} >Don't have an account? Register here.</button>
        </div>
        </div>


      <div>
        <Footer />
      </div>
    </div>
  )
}


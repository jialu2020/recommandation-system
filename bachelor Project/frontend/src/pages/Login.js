import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";

//props形参 父组件发送一些函数或值给他们的children,
export const Login = () => {
  //创建状态 email是状态的名字 然后setEmailHook是一个函数来修改状态 最开始都是null所以使用''
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //用户提交表单  handleSubmit函数负责
  function handleSubmit(event) {
    event.preventDefault();

    // Send a request to the backend to check the login credentials
    const api = "http://www.indilearnlj.de/api/login"
    const api2 = "http://localhost:5000/api/login"

    fetch(api, {
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
          localStorage.setItem('userType', data.usertype);
          localStorage.setItem('kategorie', 'English');
          console.log("login data:",data)



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

 return (
    <div>
      <div className="container"> {/* 外部容器，用于居中显示 */}
        <div className="auth-form-container"> {/* 登录表单容器 */}
          <h2>Willkommen bei Indilearn!</h2>
          <form className="login-form" onSubmit={handleSubmit}>

            <input
               style={{marginBottom: '15px'}}
              value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" />

            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
            <button type="submit">Log In</button>
          </form>
          <a href="#" className="link" onClick={handleRedirect}>
           Sie haben noch kein Konto? Registrieren Sie sich hier.
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

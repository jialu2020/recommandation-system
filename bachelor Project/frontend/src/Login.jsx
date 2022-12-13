//抓取用户的输入需要使用到new state hook from react
import React, { useState} from "react";

//props形参 父组件发送一些函数或值给他们的children,
export const Login = (props) => {
    //创建状态 email是状态的名字 然后setEmailHook是一个函数来修改状态 最开始都是null所以使用''
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //用户提交表单  handleSubmit函数负责
    const handleSubmit = (e) => {
        //如果不申明阻止默认值 那么页面将会被重新加载 然后会失去state的值
        e.preventDefault();
        console.log(email);
        console.log(password);


    }


    return(
        <div className="auth-form-container">
         <h2>Login</h2>
         <form className= "login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name= "email"/>
            <label htmlFor="password">password</label>
            <input value= {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name= "password"/>
            <button type="sunmit">Log In</button>
         </form>
         <button className="link-btn" onClick= {() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}

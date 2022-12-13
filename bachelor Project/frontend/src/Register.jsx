import React, { useState } from "react";

export const Register = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [password1, setPassword1] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        //如果不申明阻止默认值 那么页面将会被重新加载 然后会失去state的值
        e.preventDefault();
        console.log(email);
        console.log(name);
        console.log(password);
    }
    return(   
        <div className="auth-form-container">    
         <h2>Register</h2>   
         <form className= "register-form" onSubmit={handleSubmit}> 
            <label htmlFor="name">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type= "name" name="name" id="name" placeholder="full Name"/>
            <label htmlFor="email">email</label>
            <input value= {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name= "email"/>
            <label htmlFor="password">password</label>
            <input value= {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" id="password" name= "password"/>
            
            <button type="sunmit">Register</button>
         </form>
         <button className="link-btn" onClick= {() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    ) 
}
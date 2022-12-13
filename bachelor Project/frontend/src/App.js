import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";


function App() {
  //那个页面默认显示 所以默认为login页面
  const [currentForm, setCurrentForm] = useState('login');

  //切换表单 toggle form
  const toggleForm = (formName) => {
    //这是一个setCurrentForm Hook抓取表单的名称 现在我们需要使用这个函数并将其传递给我们当前的表单
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;

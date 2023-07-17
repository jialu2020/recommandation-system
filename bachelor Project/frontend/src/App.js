
import './App.css';
import React, {Component, useEffect, useState} from 'react';
import {Route,Routes} from "react-router-dom"
import Homepage from "./pages/Homepage";
import Navbar from "./Navbar";
import Myprofile from "./pages/Myprofile";
import Search from "./pages/Search";
import Course from "./pages/Course";
import Like from "./pages/Like";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Aufgabe from "./pages/Aufgabe";
import WordLearningPage from "./pages/WordLearningPage";
import OptionPage from "./pages/Course-option";


function App() {
  //那个页面默认显示 所以默认为login页面
  const [currentForm, setCurrentForm] = useState('login');
  const [currentState, setCurrentState] = useState('unlogged');
  //切换表单 toggle form
  const toggleForm = (formName) => {
    //这是一个setCurrentForm Hook抓取表单的名称 现在我们需要使用这个函数并将其传递给我们当前的表单
    setCurrentForm(formName);
  }

  const toggleState = (State) => {
    //这是一个setCurrentForm Hook抓取表单的名称 现在我们需要使用这个函数并将其传递给我们当前的表单
    setCurrentState(State);
  }
    return (
      <div className="App">

        <header>

          <Routes>

            <Route path= "/homepage" element= {<Homepage/>} />
            <Route path= "/course" element= {<Course/>} />
            <Route path= "/like" element= {<Like/>} />
            <Route path= "/search" element= {<Search/>} />
            <Route path= "/myprofile" element= {<Myprofile/>} />
            <Route  path="/" element={<Login />}  />
            <Route  path="/register" element={<Register />}  />
              <Route path= "/course/english-options" element= {<OptionPage/>} />
            <Route  path="/course/aufgabe" element={<Aufgabe />}  />
            <Route  path="/course/game" element={<WordLearningPage />}  />

          </Routes>
        </header>
      </div>



    );
}

export default App;


import './App.css';
import React, {Component, useEffect, useState} from 'react';
import axios from 'axios'

import Homepage from "./pages/Homepage";
import Navbar from "./Navbar";
import Myprofile from "./pages/Myprofile";
import Search from "./pages/Search";
import Course from "./pages/Course";
import Like from "./pages/Like";
import {Route,Routes} from "react-router-dom"



function App() {




  class User {
    constructor(firstname,lastname) {
      this.firstname=firstname
      this.lastname=lastname
    }
  }
  const u1 = new User('Jia','Lu')
  function formatName(user){
    return user.firstname+  " " + user.lastname
  }


  return (
    <div className="App">
      {/*navigationbar als Component*/}
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path= "/homepage" element= {<Homepage/>} />
          <Route path= "/course" element= {<Course/>} />
          <Route path= "/like" element= {<Like/>} />
          <Route path= "/search" element= {<Search/>} />
          <Route path= "/myprofile" element= {<Myprofile/>} />
        </Routes>

      </div>
    </div>
  );

}


export default App;

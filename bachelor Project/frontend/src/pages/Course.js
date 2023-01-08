import "./CourseStyle.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';


export default function Course(){

const navigate = useNavigate();
const [Kategorie, setKategorie] = useState('')

const handleChange = (event) => {
    setKategorie(event.target.value);
  };

 function handleClick(){
    localStorage.setItem('kategorie', Kategorie );
    navigate("/aufgabe")
  }

  return(

    <div>
      <Navbar/>
      <h1 className= "title">this page shows which course you are lerning</h1>
      <form>
        <label id = "mycourse">My Courses </label>
        <select className = "select" name="languages" id="lang" onChange={handleChange}>
          <option value="select">Select a Course</option>
          <option value="Math">Math</option>
          <option value="Eng">Eng</option>
          <option value="Deut">Deut</option>
        </select>
        <div>
        <button className = "submit" onClick= {handleClick} type="submit" >submit</button>
        </div>
      </form>
    </div>

  )


}


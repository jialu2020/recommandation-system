import "./CourseStyle.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';


export default function Course(){

const navigate = useNavigate();
const [Kategorie, setKategorie] = useState('')
const [options, setOptions] = useState([])



const handleChange = (event) => {
    setKategorie(event.target.value);
  };


    useEffect(() => {
    fetch('http://127.0.0.1:5000/getkategories/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
       console.log("data is: "+ data);
       setOptions(data);
       console.log("setoption: "+ options)
    })
  }, []);


 const optionsMap = [];
  for (let i = 0; i < options.length; i++) {
  optionsMap.push({
    value: options[i],
    label: options[i],
  });
  }
   console.log("option: "+ options)


 function handleClick(){
    localStorage.setItem('kategorie', Kategorie );
    navigate("/aufgabe")
  }

  return(

    <div>
      <Navbar/>
      <h1 className= "title">this page shows which course you are lerning</h1>
      <form>
        <label id = "mycourse">please select a Course </label>
        <select className = "select" name="languages" id="lang" onChange={handleChange} onChange={useEffect}   onChange={event => setKategorie(event.target.value)} >
           {optionsMap.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
        </select>
        <div>
        <button className = "submit" onClick= {handleClick} type="submit" >submit</button>
        </div>
      </form>
    </div>

  )


}


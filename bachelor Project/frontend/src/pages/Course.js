import "./CourseStyle.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function Course() {
  const navigate = useNavigate();
  const [Kategorie, setKategorie] = useState('')
  const [options, setOptions] = useState([])
  const [username, setusername] = useState(localStorage.getItem('username'))

  const handleChange = (event) => {
    setKategorie(event.target.value);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getkategories/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("data is: " + data);
      setOptions(data);
      console.log("setoption: " + options)
    })
  }, []);

  const optionsMap = options.map((option) => ({
    value: option,
    label: option,
  }));

  function handleClick() {
    console.log('kategorie:' + Kategorie)
    localStorage.setItem('kategorie', Kategorie);
    if (Kategorie === "English") {
      navigate("/course/english-options");
    } else {
      navigate("/course/aufgabe");
    }
  }

  return (
    <div>
      <Navbar />
      <h1 className="title">This page shows which course you are learning</h1>
      <form>
        <label id="mycourse">Please select a course:</label>
        <select className="select" name="languages" id="lang" onChange={handleChange}>
          <option value="">Select your course</option>
          {optionsMap.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div>
          <button className="submit" onClick={handleClick} type="submit" disabled={Kategorie === ""}>Submit</button>
        </div>
      </form>
      {Kategorie === "" && <p>Please select a course!</p>}
    </div>
  )
}

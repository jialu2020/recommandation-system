import "./SearchStyle.css"
import Navbar from "../Navbar";
import React, { useState, useEffect} from "react";
export default function Search(){


  const [fachname, setFachname] = useState('');
  const [options, setOptions] = useState([]);
  const [username,setUsername] = useState(localStorage.getItem("username"));


    useEffect(() => {
    fetch('http://127.0.0.1:5000/getkategories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
      console.log("data is: "+ data);
      setOptions(data);        //use setOptions to update the options
       console.log("setop: "+ options)
    })
  }, []);






  const optionsMap = [];
  for (let i = 0; i < options.length; i++) {
  optionsMap.push({
    value: options[i],
    label: options[i],
  });
  }


 function handleSubmit(event) {
  event.preventDefault();
    fetch('http://127.0.0.1:5000///addsubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        fachname,
      }),
    }).then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('You have chosen a course successfully!');

        }
      })
      .catch(error => {
        alert(error.toString());
      });
  };


console.log("fachname ==== > : "+ fachname)
console.log("username ==== > : "+ username)



function handleClick(){

  }


return (
  <div>
    <Navbar/>
    <h1 className= "title">this page shows our current course</h1>
    <form  onSubmit={handleSubmit}>
      <label id = "mycourse">select a course and add it to my course</label>
      <select className = "show" name="languages" id="lang" size = "5" onChange={useEffect}  onChange={event => setFachname(event.target.value)}>
        {optionsMap.map((option , index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div>
        <button className = "submit" onClick= {handleClick} type="submit" >add to my course</button>
      </div>
    </form>
  </div>
);

}




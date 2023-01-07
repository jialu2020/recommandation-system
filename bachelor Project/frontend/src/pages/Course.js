import "./CourseStyle.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";



export default function Course(){

const navigate = useNavigate();

 function handleClick(){
    navigate("/aufgabe")
  }

  return(

    <div>
      <Navbar/>
      <h1 className= "title">this page shows which course you are lerning</h1>
      <form>
        <label id = "mycourse">My Courses </label>
        <select className = "select" name="languages" id="lang">
          <option value="select">Select a Course</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
        </select>
        <div>
        <button className = "submit" onClick= {handleClick} type="submit" >submit</button>
        </div>
      </form>
    </div>

  )


}


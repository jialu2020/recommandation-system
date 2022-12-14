import "./CourseStyle.css"
import Navbar from "../Navbar";
export default function Course(){
  return(


    <div>
      <Navbar/>
      <h1 class= "title">this page shows which course you are lerning</h1>
      <form>
        <label id = "mycourse">My Courses </label>
        <select class = "select" name="languages" id="lang">
          <option value="select">Select a Course</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="c#">C#</option>
          <option value="C++">C++</option>
        </select>
        <button class = "submit" type="submit">submit</button>
      </form>
    </div>

  )


}


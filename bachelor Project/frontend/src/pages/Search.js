import "./SearchStyle.css"
import Navbar from "../Navbar";

export default function Search(){
  return(
    <div>
       <Navbar/>
         <h1 class = "title">
          This is the search page
         </h1>

      <div>
        <form>
          <input className="search" type="text" placeholder="search a course.."/>

        </form>
        <button className="submit" type="submit">search</button>

      </div>



    </div>
  )

}


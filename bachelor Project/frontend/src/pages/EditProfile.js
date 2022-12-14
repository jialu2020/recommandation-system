import React from "react";
export default ({changeToFalse})=>{

  return(

    <div>
       <input className = "search" placeholder = "firstname.." />
       <input className = "search"   placeholder = "lastname.." />
       <input className = "search" placeholder = "email.." />
       <input className = "search" placeholder = "passwort.." />
       <button className = "submit">submit</button>
       <button className= "back" onClick={()=>changeToFalse()}>back</button>
    </div>

  )

}


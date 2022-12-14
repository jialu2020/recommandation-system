import React from "react";
export default function changeToFalse(){

  return(
    <div>

       <input class = "search" placeholder = "firstname.." />
       <input class = "search"   placeholder = "lastname.." />
       <input class = "search" placeholder = "email.." />
      <input class = "search" placeholder = "passwort.." />
      <button class = "submit">submit</button>
      <button class = "back" onClick={() => changeToFalse}>back</button>

    </div>

  )


}

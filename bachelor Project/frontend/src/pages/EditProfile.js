import React from "react";
export default ({changeToFalse})=>{
  //const [editProfile, setEditProfile] = useState();

  async function getSessionData() {
  const response = await fetch('http://127.0.0.1:5000/api/session');
  const data = await response.json();
  return data; }



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


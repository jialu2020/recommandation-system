import React from 'react';
import "./Navbar.css"

function Navbar(){

  return(
    <div>
     <nav>
       <a>
         {}
         <svg id="logo-11" width="100" height="50" viewBox="0 0 119 30" fill="none" xmlns="">

         </svg>
       </a>
       <div>
         <ul id ="navbar">
           <li><a href="/Homepage" title="Homepage">Home</a></li>
           <li><a href="/Course" title="meine Aufgaben">My Course</a></li>
           <li><a href="/Search" title="Aufgabe suchen">Join course</a></li>
           <li><a href="/Like" title="gespeicherte Aufgaben">My like</a></li>
           <li><a href="/Myprofile" title="mein Konto">My Profile</a></li>
         </ul>
       </div>
     </nav>
    </div>

  )

}

export default Navbar

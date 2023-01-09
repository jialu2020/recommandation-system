import "./MyprofileStyle.css"
import EditProfile from "./EditProfile";
import {useEffect, useState} from "react";
import Navbar from "../Navbar";
function Myprofile(){

  const [username, setUsername] = useState('');
   // The empty array as the second argument causes this effect to run only once when the component mounts
  const [editMode, setEditMode] = useState(false);
  // useState 的用法是，需要传入一个参数作为状态的初始值，当函数执行后会返回两个值，一个是当前状态的属性，一个是修改状态的方法。
  //The usage of useState is to pass a parameter as the initial value of the state,
  // and when the function is executed it will return two values,
  // a property of the current state and a method to modify the state.


  function changeToFalse(){
    setEditMode(false)

  }



 function handleSubmit(event) {
    event.preventDefault();
  }

  return(

  <div>
    <Navbar/>
     {editMode ? (
       <div>
         <EditProfile changeToFalse  = {changeToFalse} />
       </div>
       ):(
       // falls editMode=true shows regular things(page), click button back, quit Edit mode

        <div>
         <form onSubmit={handleSubmit}>
          <ul id="userinfo">
             <li id="listelement">username:  {localStorage.getItem('username')}</li>

             <li id="listelement">password: {localStorage.getItem('password')}</li>

             <li id="listelement">my subject: {null}</li>

          </ul>
              <button type = "submit" onClick={()=>setEditMode(true)}>Edit password</button>
         </form>
      </div> )}
  </div>



)


}


export default Myprofile


import "./MyprofileStyle.css"
import EditProfile from "./EditProfile";
import {useState} from "react";
import Navbar from "../Navbar";
function Myprofile(){

  class User {
    constructor(firstname,lastname) {
      this.firstname=firstname
      this.lastname=lastname
    }
  }
   const u1 = new User('Jia','Lu')


  function getfirstname(user){
    return user.firstname;
  }
  function getlastname(user){
    return user.lastname;
  }

  const [editMode, setEditMode] = useState(false);
  // useState 的用法是，需要传入一个参数作为状态的初始值，当函数执行后会返回两个值，一个是当前状态的属性，一个是修改状态的方法。
  //The usage of useState is to pass a parameter as the initial value of the state,
  // and when the function is executed it will return two values,
  // a property of the current state and a method to modify the state.


  function changeToFalse(){
    setEditMode(false)
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
          <ul id="userinfo">
             <li id="listelement">firstname: {getfirstname(u1)}</li>
             <li id="listelement">lastname: {getlastname(u1)}</li>
             <li id="listelement">email:</li>
             <li id="listelement">My courses :</li>
          </ul>
              <button className = "submit" onClick={()=>setEditMode(true)}>Edit</button>
      </div> )}
  </div>


)


}
export default Myprofile


import "./MyprofileStyle.css"
import EditProfile from "./EditProfile";
import {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import Navbar from "../Navbar";
function Myprofile(){

  const [username, setUsername] = useState(localStorage.getItem('username'));
   // The empty array as the second argument causes this effect to run only once when the component mounts
  const [editMode, setEditMode] = useState(false);
  // useState 的用法是，需要传入一个参数作为状态的初始值，当函数执行后会返回两个值，一个是当前状态的属性，一个是修改状态的方法。
  //The usage of useState is to pass a parameter as the initial value of the state,
  // and when the function is executed it will return two values,
  // a property of the current state and a method to modify the state.
  const [UserLeistung, setUserLeistung] = useState({});

  const [mysub, setmysub] = useState('');

  const [scores, setscores] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/getleistung/' + username).then(response => {
      console.log("SUCCESS", response)
      setUserLeistung(response.data)
    }).catch(error => {
      console.log(error)
    })

    fetch('http://127.0.0.1:5000/getkategories/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      })
      .then((response) => response.json())
      .then((data) => {
       console.log("data is: "+ data);
       setmysub(data)
        console.log("mysub: "+ mysub);
    })

 }, [])


 function showscore(){

    let UserKategorie= [... new Set(UserLeistung.map((leistung)=>leistung.kategorie))];

    let newscore = [];

    for(let i = 0; i<UserKategorie.length; i++)
    {

       newscore =
       [...newscore,
       {kategorie: UserKategorie[i],
       score: (UserLeistung.filter( item => item.kategorie == UserKategorie[i]).filter(item => item.score == true).length/UserLeistung.filter( item => item.kategorie == UserKategorie[i]).length).toFixed(2)
       }
       ]
       ;
       setscores(newscore)
       console.log(scores)
        console.log(newscore)
        console.log(UserLeistung.filter( item => item.kategorie == UserKategorie[i]).length)
        console.log(UserLeistung.filter( item => item.kategorie == UserKategorie[i]).filter(item => item.score == true).length)//.filter( item => item.kategorie == UserKategorie[i]).length)
    }

 }

  const mysubShow = [];
 for (let i = 0; i < mysub.length; i++) {
   mysubShow[i] = mysub[i] + '  '
  }
   console.log("mysubShow: "+ mysubShow)


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
         <form onSubmit={handleSubmit} >
          <ul id="userinfo">
             <li id="listelement">username:  {localStorage.getItem('username')}</li>

             <li id="listelement">password: {localStorage.getItem('password')}</li>

             <li id="listelement">my current courses: {mysubShow}</li>

             <li id="listelement">my subjects:

             {scores && scores.map(item =>
                        <tr key={item.kategorie}>
                            <td>{item.kategorie} : {item.score*100} / 100</td>
                        </tr>
                    )}
             </li>
          </ul>
              <button type = "submit" onClick={()=>showscore()}>Show score</button>
              <button type = "submit" onClick={()=>setEditMode(true)}>Edit password</button>
         </form>
      </div> )}
  </div>



)


}


export default Myprofile


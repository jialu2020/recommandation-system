import Navbar from "../Navbar";
import './HomepageStyle.css';

export default function Homepage(){
  return(
     <div id = "container">
       <Navbar/>
       <h1 class = "title">About us: </h1>
        <div>
           <h2 class = "second_title">
         IndiLearn: Individualized Exercise Selection in a Web-based Learning Platform using an IRT-based Recommender System
          </h2>
          <div class = "box">
            <span>
            "IndiLearn" aims to develop a learning system that uses a recommendation system as a tool to provide customized exercises in different subjects based on each student’s performance.
              The system evaluates the difficulty of the practice questions and the user’s performance, and automatically recommends more challenging tasks to reinforce their performance in a particular subject.
            The goal is to improve the quality of teaching and learning, reduce the teacher’s workload, and increase students’ interest in learning.
             </span>




            </div>
       </div>

     </div>


  )

}


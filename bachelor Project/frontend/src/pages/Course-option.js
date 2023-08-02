import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionPage.css';
import Navbar from "../Navbar";
import spellingPic from "../icons/spell-check.png"
import gamePic from "../icons/choice.png"
import choice from "../icons/choice_multi.png"
import Footer from "../footer";
import random from "../icons/random.png"

const OptionPage = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    // 处理进入Game页面的逻辑
    navigate('/course/game');
    console.log("enter game page");
  };

  const handleAufgabeClick = () => {
    // 处理进入Aufgabe页面的逻辑
    navigate('/course/aufgabe');
  };

    const handleChoiceClick = () => {
    // 处理进入Aufgabe页面的逻辑
    navigate('/course/multiple-choice');
  };

    const handleRandomClick = () => {
    const options = ['/course/aufgabe', '/course/game', '/course/multiple-choice'];
    const randomIndex = Math.floor(Math.random() * options.length);
    navigate(options[randomIndex]);
  };

  return (
    <div>

      <Navbar />
       <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>

         <h1 className="title">Beginnen, englische Vokabeln zu lernen</h1>
         <div className="option-container">
           <div className="option" onClick={handleAufgabeClick}>
             <img src={spellingPic} alt="Spelling" />
             <p className="title2">spelling</p>
           </div>
           <div className="option" onClick={handleGameClick}>
             <img src={gamePic} alt="game" />
             <p className="title2">Start Learning</p>
           </div>
               <div className="option" onClick={handleChoiceClick}>
             <img src={choice} alt="game" />
             <p className="title2">Multi Chioce</p>
           </div>
            <div className="option" onClick={handleRandomClick}>
             <img src={random} alt="game" />
             <p className="title2">Random</p>
           </div>
         </div>

       </div>



      <div>
        <Footer />
      </div>
    </div>
  );
};

export default OptionPage;

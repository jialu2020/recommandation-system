import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OptionPage.css';
import Navbar from "../Navbar";
import spellingPic from "../icons/spell-check.png"
import gamePic from "../icons/choice.png"
import Footer from "../footer";

const OptionPage = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    // 处理进入Game页面的逻辑
    navigate('/course/game');
  };

  const handleAufgabeClick = () => {
    // 处理进入Aufgabe页面的逻辑
    navigate('/course/aufgabe');
  };

    const handleChoiceClick = () => {
    // 处理进入Aufgabe页面的逻辑
    navigate('/course/multiple-choice');
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
             <img src={gamePic} alt="game" />
             <p className="title2">Multi Chioce</p>
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

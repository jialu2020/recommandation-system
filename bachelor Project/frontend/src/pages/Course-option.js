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

  return (
    <div>

      <Navbar />
       <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>

         <h1>What do you want?</h1>
         <div className="option-container">
           <div className="option" onClick={handleAufgabeClick}>
             <img src={spellingPic} alt="Spelling" />
             <p className="title2">1.Spelling</p>
           </div>
           <div className="option" onClick={handleGameClick}>
             <img src={gamePic} alt="game" />
             <p className="title2">2. Game</p>
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

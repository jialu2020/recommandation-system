import React, { useState } from 'react';
import './WordLearningPage.css';
import Navbar from "../Navbar";

const WordLearningPage = ({ word, hint }) => {
  word = "apple"
  hint = "apple"

  const [currentAnswer, setCurrentAnswer] = useState('');

  const handleButtonClick = (letter) => {
    setCurrentAnswer((prevAnswer) => prevAnswer + letter);
  };
  const wordString = String(word);
  const letters = wordString.split('');

  const handleSubmit = () => {
    // 在这里添加你想要执行的操作，比如检查答案等

    // 清空当前答案
    setCurrentAnswer('');
  };

  return (
    <div>
      <Navbar />
    <div className="Aufgabe">
      <div className="word-learning-page">
      <h2 id="title" >Word Learning Page</h2>
      <p id="hint">Hint: {hint}</p>
      <div className="word-buttons">
        {letters.map((letter, index) => (
          <button
            key={index}
            className="letter-button"
            onClick={() => handleButtonClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
        <div className="answer-section">

            <input type="text" value={currentAnswer} disabled className="answer-input" />


            <button className="submit-button" onClick={handleSubmit}>Submit</button>

        </div>

      </div>

    </div>
    </div>
  );
};

export default WordLearningPage;

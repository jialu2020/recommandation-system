import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage.css';
import Navbar from "../Navbar";
import axios from 'axios'


  const WordLearningPage = ({  hint }) => {


    const [word, setWord] = useState([]);

    const [currentAnswer, setCurrentAnswer] = useState('');

    const [dataSource, setdataSource] = useState([]);

    const [getMessage, setGetMessage] = useState({})

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [showScore, setShowScore] = useState(false);

    const [showSubmit, setShowSubmit] = useState(false);

    const [score, setScore] = useState(0);

    const [done, setDone] = useState(0);

    const [kategorie, setkategorie] = useState(localStorage.getItem('kategorie'));

    const [schwerigkeit, setschwerigkeit] = useState('');

    const [message, setMessage] = useState('');

    const [DateTime, setDateTime] = useState('');

    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);

    const [clickedButtons, setClickedButtons] = useState([]);

    const [hearts, setHearts] = useState(3); // the number of hearts are 3



    useEffect(() => {
      let thisuser = localStorage.getItem('username');
      axios.get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie)
        .then(response => {
          console.log("SUCCESS", response);
          setGetMessage(response);
          const aufgabenstellungen = response.data.map(item => item.aufgabenstellung);
          setWord(aufgabenstellungen[currentObjectIndex]);
        })
        .catch(error => {
          console.log(error);
        });
      setShowSubmit(false);
    }, [currentObjectIndex]); // 添加 currentObjectIndex 作为依赖




    const handleButtonClick = (letter) => {
      setCurrentAnswer((prevAnswer) => prevAnswer + letter);
    };

  const handleSubmit = () => {
    // 检查当前答案与 musterloesung 是否一致
    const currentObject = getMessage.data[currentObjectIndex];
    const isCorrect = currentAnswer.toLowerCase() === currentObject.musterloesung.toLowerCase();
    console.log("click and is ")
    console.log(isCorrect)
    console.log("this word")
    console.log(word)

    // 更新得分和已完成的题目数量
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setHearts((prevHearts) => prevHearts - 1);
    }

    setDone((prevDone) => prevDone + 1);

    // 清空当前答案
    setCurrentAnswer('');

    // 判断是否还有下一个对象，如果有则生成新的 word
    if (currentObjectIndex < getMessage.data.length - 1) {
      setCurrentObjectIndex((prevIndex) => prevIndex + 1);
      const nextObject = getMessage.data[currentObjectIndex + 1];
      setWord(nextObject.aufgabestellung);
    } else {
      // 如果已完成所有题目，则显示得分
      setShowScore(true);
      console.log("no more")
      console.log(score)
    }

  };

    const handleDelete = () => {
      setCurrentAnswer((prevAnswer) => prevAnswer.slice(0, -1));
    };






    const shuffledWord = useMemo(() => {
      const wordString = String(word);
      let chars = wordString.split('');
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
      return chars.join('');
    }, [word]);

    const letters = shuffledWord.split('');
    const progress = (done / (getMessage?.data?.length || 1)) * 100; // Calculate progress percentage



    return (
    <div>
      <Navbar />
    <div className="Aufgabe">
      <div className="word-learning-page">
      <h2 id="title" >Word Learning Page</h2>
      <p id="hint">Hint: {word}</p>
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
            <button className="delete-button" onClick={handleDelete}>Delete</button>

            <button className="submit-button" onClick={handleSubmit} disabled={!currentAnswer}>Submit</button>

        </div>


        <div className="scoreboard">
          <h3>Score: {score}</h3>

        </div>

        <div className="hearts">
          {Array(hearts)
            .fill()
            .map((_, index) => (
              <span key={index} className="heart-icon">
                  ❤️
                </span>
            ))}

      </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>


    </div>
    </div>
  );
};

export default WordLearningPage;

import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage.css';
import Navbar from "../Navbar";
import axios from 'axios'
import imageGif from "../icons/icons8-heart-64.png"




  const WordLearningPage = ({  hint }) => {



    const [word, setWord] = useState([]);

    const [currentAnswer, setCurrentAnswer] = useState('');

    const [dataSource, setDataSource] = useState([]);

    const [getMessage, setGetMessage] = useState({})

    const [showScore, setShowScore] = useState(false);

    const [showSubmit, setShowSubmit] = useState(false);

    const [score, setScore] = useState(0);

    const [done, setDone] = useState(0);

    const [kategorie, setkategorie] = useState(localStorage.getItem('kategorie'));

    const [schwerigkeit, setschwerigkeit] = useState('');

    const [message, setMessage] = useState('');

    const [DateTime, setDateTime] = useState('');

    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);

    const [hearts, setHearts] = useState(3); // the number of hearts are 3

    const [chances, setChances] = useState(3);

    const [clickedLetters, setClickedLetters] = useState([]); // 存储已点击的字母


useEffect(() => {
  let thisuser = localStorage.getItem('username');
  axios.get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie)
    .then(response => {
      console.log("SUCCESS", response);
      setGetMessage(response);
      const aufgabenstellungen = response.data.map(item => item.aufgabenstellung);
      setWord(aufgabenstellungen[0]); // 设置初始的题目
    })
    .catch(error => {
      console.log(error);
    });
  setShowSubmit(false);
}, []);



const checkAnswer = (answer, musterloesung) => {
  return answer.toLowerCase() === musterloesung.toLowerCase();
};




const handleButtonClick = (letter) => {
      setCurrentAnswer((prevAnswer) => prevAnswer + letter);
      setClickedLetters((prevClickedLetters) => [...prevClickedLetters, letter]);

    };



 const handleSubmit = () => {
  const currentObject = getMessage.data[currentObjectIndex];
  const isCorrect = checkAnswer(currentAnswer, currentObject.musterloesung);

  if (currentObjectIndex < getMessage.data.length - 1) {
    //逻辑是 先判断下一道题是否存在
    if (isCorrect) {
      setDataSource((prevDataSource) => [
        ...prevDataSource,
        {
          num: done + 1,
          aufgabe: currentObject.aufgabenstellung,
          antwort: currentAnswer,
          musterloesung: currentObject.musterloesung,
          bewertung: true,

        },
      ]);
      setHearts(3);
      setCurrentObjectIndex((currentObjectIndex) => currentObjectIndex + 1);
      setScore((prevScore) => prevScore + 1);
      setDone((prevDone) => prevDone + 1);
      setWord(getMessage.data[currentObjectIndex + 1]?.aufgabenstellung);
    } else {
      setHearts((prevHearts) => prevHearts - 1);
      console.log('your chances left:' + hearts);
      setCurrentAnswer('');

      if (hearts === 1) {
        setDataSource((prevDataSource) => [
          ...prevDataSource,
          {
            num: done + 1,
            aufgabe: currentObject.aufgabenstellung,
            antwort: currentAnswer,
            musterloesung: currentObject.musterloesung,
            bewertung: false,

          },
        ]);
        setHearts(3);
        setCurrentObjectIndex((currentObjectIndex) => currentObjectIndex + 1);
        setDone((prevDone) => prevDone + 1);
        setWord(getMessage.data[currentObjectIndex + 1]?.aufgabenstellung);
      }
    }
  } else {
    if (isCorrect) {
      setDataSource((prevDataSource) => [
        ...prevDataSource,
        {
          num: done + 1,
          aufgabe: currentObject.aufgabenstellung,
          antwort: currentAnswer,
          musterloesung: currentObject.musterloesung,
          bewertung: true,

        },
      ]);

      setScore((prevScore) => prevScore + 1);
      setShowScore(true);

    } else {
      setHearts((prevHearts) => prevHearts - 1);
      console.log('your chances left:' + hearts);
      if (hearts === 1) {
        setDataSource((prevDataSource) => [
          ...prevDataSource,
          {
            num: done + 1,
            aufgabe: currentObject.aufgabenstellung,
            antwort: currentAnswer,
            musterloesung: currentObject.musterloesung,
            bewertung: false,

          },
        ]);
        setShowScore(true);
      }
    }
  }

  setCurrentAnswer('');

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


    function getNewLevel(){
      let thislevel = 0.0

      for(let i = 0; i<dataSource.length; i++){
        //dataSource[i]
        let thisschwerigkeit = getMessage.data[i].schwerigkeit
        let thisdiscrimination = getMessage.data[i].discrimination
        let thisbewertung = dataSource[i].bewertung
        let gewicht = getGewicht(thisschwerigkeit)

        thislevel += thisschwerigkeit * thisdiscrimination * (thisbewertung=="richtig"?1:0) * gewicht
      }

      return thislevel
    }

    function getGewicht(gotschwerigkeit){
      if (gotschwerigkeit<-1){
        return 0.45}
      else if(gotschwerigkeit<0){
        return 0.35}
      else if(gotschwerigkeit<1){
        return 0.25}
      else if(gotschwerigkeit<2){
        return 0.15}
      else if(gotschwerigkeit<3){
        return 0.05}
      else{ return 0.02}

    }

const handleContinue = () => {
  let thisuser = localStorage.getItem('username');
  axios.get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie)
    .then(response => {
      console.log("SUCCESS", response);
      setGetMessage(response);
      const aufgabenstellungen = response.data.map(item => item.aufgabenstellung);
      setWord(aufgabenstellungen[0]); // 设置初始的题目
    })
    .catch(error => {
      console.log(error);
    });
  console.log("datasource")
  console.log(dataSource)
  updateLeistung();


  let newlevel = {username: localStorage.getItem('username'),
    faehigkeit: getnewlevel(),
    kategorie: localStorage.getItem('kategorie'),
    zeit: DateTime}

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newlevel)
  };
  fetch('http://127.0.0.1:5000/addlevel', requestOptions)
    .then(response => response.json())
    .then(newlevel);

  // 重置状态
  setCurrentAnswer('');
  setDataSource([]);
  setDone(0);
  setScore(0);
  setHearts(3);
  setCurrentObjectIndex(0);
  setShowScore(false);
};



    function getnewlevel(){
      let thislevel = 0.0

      for(let i = 0; i<dataSource.length; i++){
        //dataSource[i]
        let thisschwerigkeit = getMessage.data[i].schwerigkeit
        let thisdiscrimination = getMessage.data[i].discrimination
        let thisbewertung = dataSource[i].bewertung
        let gewicht = getGewicht(thisschwerigkeit)

        thislevel += thisschwerigkeit * thisdiscrimination * (thisbewertung=="richtig"?1:0) * gewicht
      }
      console.log(thislevel)
      return thislevel
    }



    function updateLeistung(){

      const currentDate = new Date();
      const formattedDateTime = currentDate.toISOString();
      for(let i=0; i<dataSource.length; i++){
        setDateTime(Date().toLocaleString());

//      console.log(getMessage.data[i].schwerigkeit+"***")

        let leistung = {username: localStorage.getItem('username'),
          aufgabestellung: getMessage.data[i].aufgabenstellung,
          score : dataSource[i].bewertung,
          kategorie : localStorage.getItem('kategorie'),
          schwerigkeit : getMessage.data[i].schwerigkeit,
          zeitpunkt : formattedDateTime};

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leistung)
        };
        fetch('http://127.0.0.1:5000/addleistung', requestOptions)
          .then(response => response.json())
          .then(leistung);
      }
    }



      return (
        <div>
          <Navbar/>

        {showScore ? (
      <div className="Aufgabe">
        <div className="word-learning-page">
           {score >= 4 && <h2 className = "title">Excelent!</h2>}
          {score >2 && score < 4 && <h2 className = "title">Good job!</h2>}
          {score < 2 && (
            <div>
              <h2 className="title">Ops</h2>
              <p className="hint">You need more practice!</p>
            </div>
          ) }
          <p className="hint">your score is: {score}</p>

          <button onClick={handleContinue}>Continue</button>
        </div>
      </div>
      ) :
          (<div className="Aufgabe">
            <div className="word-learning-page">
              <h2 className="title">Word Learning Page</h2>
              <p className="hint">Hint: {word}</p>
              <div className="heart-container">
                <div className="hearts">
                  {Array(hearts)
                    .fill()
                    .map((_, index) => (
                      <img
                        key={index}
                        src={imageGif}// 替换为适当的图像路径
                        alt="Heart"
                        className="heart-icon"
                      />
                    ))}
                </div>
              </div>
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

                <input type="text" value={currentAnswer} disabled className="answer-input"/>
                <button className="delete-button" onClick={handleDelete}>Delete</button>

                <button className="submit-button" onClick={handleSubmit} disabled={!currentAnswer}>Submit</button>

              </div>


              <div className="scoreboard">
                <h3>Score: {score}</h3>

              </div>


              <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${progress}%`}}></div>
              </div>
            </div>


          </div>)}
        </div>
      );
    };

    export default WordLearningPage


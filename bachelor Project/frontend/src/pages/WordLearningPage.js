import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage.css';
import Navbar from "../Navbar";
import axios from 'axios'
import imageGif from "../icons/icons8-heart-64.png"
import sadGif from "../icons/X5Na.gif"
import wowGif from "../icons/bfX.gif"
import goodGif from "../icons/5de.gif"
import Footer from "../footer";
import {useNavigate} from "react-router-dom";
import loading1 from "../icons/icons8-loading.gif";





  const WordLearningPage = () => {

     const [hint, setHint] = useState('');

     const [word, setWord] = useState('');

    const [currentAnswer, setCurrentAnswer] = useState('');

    const [dataSource, setDataSource] = useState([]);

    const [getMessage, setGetMessage] = useState({})

    const [showScore, setShowScore] = useState(false);

    const [showSubmit, setShowSubmit] = useState(false);

    const [score, setScore] = useState(0);

    const [done, setDone] = useState(0);

    const [kategorie, setkategorie] = useState(localStorage.getItem('kategorie'));


    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);

    const [hearts, setHearts] = useState(3); // the number of hearts are 3

    const [chances, setChances] = useState(3);

    const [clickedLetters, setClickedLetters] = useState([]); // 存储已点击的字母

    const [level, setLevel] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [clickedButtons, setClickedButtons] = useState([]);

    const [clickedOrder, setClickedOrder] = useState([]);





useEffect(() => {
  const thisuser = localStorage.getItem('username');
  const userType = localStorage.getItem('userType');


  let apiPath = '';
  const apiPath2 = 'http://localhost:5000/getaufgabe/';

  if (userType === 'normal') {
    apiPath = `${process.env.REACT_APP_BACKEND_URL}/getaufgabeNormal/`;
    console.log("it is normal api")
  } else if (userType === 'recommendation') {
    apiPath = `${process.env.REACT_APP_BACKEND_URL}/getaufgabe/`;
    console.log("it is RS api")
  }

  if (apiPath) {
    axios.get(apiPath + thisuser + '/' + kategorie)
      .then(response => {
        console.log("SUCCESS", response);
        setGetMessage(response);
        const hint = response.data.map(item => item.aufgabenstellung);
        const answer = response.data.map(item => item.musterloesung);

        setHint(hint[0]);
        setWord(answer[0]);
        console.log("answer");
        console.log(answer);
        console.log(answer[0]);

        // 设置初始的题目
      })
      .catch(error => {
        console.log(error);
      });
    setShowSubmit(false);
  }
}, []);



const checkAnswer = (answer, musterloesung) => {
  return answer.toLowerCase() === musterloesung.toLowerCase();
};




const handleButtonClick = (id, letter) => {
      if (!clickedButtons[id]) {
      setCurrentAnswer((prevAnswer) => prevAnswer + letter);
      setClickedButtons((prevClickedButtons) => ({ ...prevClickedButtons, [id]: true }));
      setClickedOrder((prevClickedOrder) => [...prevClickedOrder, id]); // 将点击的按钮索引添加到点击顺序数组
    }

};




 const handleSubmit = () => {
  const currentObject = getMessage.data[currentObjectIndex];
  const isCorrect = checkAnswer(currentAnswer, currentObject.musterloesung);
  setClickedButtons({});

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
      setWord(getMessage.data[currentObjectIndex + 1]?.musterloesung);
      setHint(getMessage.data[currentObjectIndex + 1]?.aufgabenstellung);
    } else {
      setHearts((prevHearts) => prevHearts - 1);
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
        setWord(getMessage.data[currentObjectIndex + 1]?.musterloesung);
        setHint(getMessage.data[currentObjectIndex + 1]?.aufgabenstellung);
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
         addRank();

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
           addRank();

      }
    }
  }

  setCurrentAnswer('');

};



  const handleDelete = () => {
    if (clickedOrder.length > 0) {
      const lastClickedIndex = clickedOrder.pop();
      setClickedButtons((prevClickedButtons) => ({
        ...prevClickedButtons,
        [lastClickedIndex]: false,
      }));
    }

    // 删除当前答案的最后一个字符
    setCurrentAnswer((prevAnswer) => prevAnswer.slice(0, -1));
  }




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

const navigate = useNavigate();

const handleContinue = () => {
  const now = new Date();
  const localTime = now.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

  setIsLoading(true);
  updateLeistung();

  let newLevel = {
    username: localStorage.getItem('username'),
    faehigkeit: calculateLevel(),
    kategorie: localStorage.getItem('kategorie'),
    zeit: localTime
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLevel),
  };

  fetch(`${process.env.REACT_APP_BACKEND_URL}/addlevel`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(levelData => {
      setLevel(levelData);
      setIsLoading(false);

    })
    .catch(error => {
      console.log(error);
      setIsLoading(false);
    });



      const options = ['/course/aufgabe', '/course/multiple-choice'];
      const randomIndex = Math.floor(Math.random() * options.length);
      navigate(options[randomIndex]);
};


    function calculateLevel() {

      let level = 0.0;

      for (let i = 0; i < dataSource.length; i++) {
        let schwerigkeit = getMessage.data[i].schwerigkeit;
        let discrimination = 1
        let bewertung = dataSource[i].bewertung;
        let gewicht = getGewicht(schwerigkeit);

          console.log(`DataSource[${i}].bewertung: ${dataSource[i].bewertung}`);
          console.log(`DataSource[${i}].schwerigkeit: ${schwerigkeit}`);
          console.log(`DataSource[${i}]gewicht: ${gewicht}`);

        level += schwerigkeit * discrimination * (bewertung ? 1 : 0) * gewicht;
        console.log("Final level: ", level);
      }

       console.log("jisuan level ");
       console.log(level);
      return level;

    }




    function updateLeistung() {
      for (let i = 0; i < dataSource.length; i++) {

        const now = new Date();
        const localTime = now.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

        let leistung = {
          username: localStorage.getItem('username'),
          aufgabestellung: getMessage.data[i].aufgabenstellung,
          score: dataSource[i].bewertung,
          kategorie: localStorage.getItem('kategorie'),
          schwerigkeit: getMessage.data[i].schwerigkeit,
          zeitpunkt : localTime,
          typ: 'FILL'
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leistung)
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/addleistung`, requestOptions)
          .then(response => response.json())
          .then(leistungData => {
            console.log(leistungData);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }


    async function addRank() {
      const username = localStorage.getItem('username');
      try {
        // 要增加的 rank 值，这里设置为 4
        const rankToAdd = 4;
        // 构建请求体，传递 rank 参数
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rank: rankToAdd }),
        };

        // 发起 POST 请求调用 addrank 方法
        const api1 = `${process.env.REACT_APP_BACKEND_URL}/addrank/${username}/${rankToAdd}`;
        const api2 = `http://127.0.0.1:5000/addrank/${username}/${rankToAdd}`;

        // 根据条件选择使用的API
        const useApi2 = false;

        const apiUrl = useApi2 ? api2 : api1;

        const response = await fetch(apiUrl, requestOptions);

        if (!response.ok) {
          throw new Error('request fail');
        }
        const data = await response.json();
        console.log(data.message); // 可选：打印服务器返回的消息
        // 处理请求成功的逻辑，如果需要的话
      } catch (error) {
        console.error('error occured：', error);
        // 处理错误情况，如果需要的话
      }
}



      return (
        <div >
          <Navbar/>
       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
         {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}
        >Loading...  <img src={loading1} alt="Loading..." /></div>
        ) : showScore ? (
             <div className="Aufgabe" >
               <div className="word-learning-page">
                 {score >= 4 && (
                   <React.Fragment>
                     <h2 className="title">Ausgezeichnet!</h2>
                     <p className="hint">Du hast alle Fragen richtig beantwortet!</p>
                      <div className="score-gif-container mt20">
                     <img src={wowGif} alt="Excellent" className="score-gif" />
                        </div>
                   </React.Fragment>
                 )}
                 {score > 2 && score < 4 && (
                   <React.Fragment>
                     <h2 className="title">Gut gemacht!</h2>
                     <p className="hint">Nicht schlecht. Mach weiter so!</p>
                      <div className="score-gif-container mt20">
                     <img src={goodGif} alt="Good Job" className="score-gif" /> </div>
                   </React.Fragment>
                 )}
                 {score <= 2 && (
                   <React.Fragment>
                     <h2 className="title">Hoppla..</h2>
                     <p className="hint">Du musst mehr üben!</p>
                      <div className="score-gif-container mt20">
                     <img src={sadGif} alt="Oops" className="score-gif" /></div>
                   </React.Fragment>
                 )}
                 <p className="hint">dein Ergebnis: {score}</p>
                  <p >Mit dieser Übung hast du 4 Punkte erreicht.</p>

                 <button className='continue' onClick={handleContinue}>Weiter</button>
               </div>
             </div>
           ) :
           (<div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
             <div className="word-learning-page" >
               <h2 className="title" style={{ marginTop: '20px'}}>Klicke auf die Buchstaben, um die entsprechenden Wörter zu bilden</h2>
               <p className="hint">Hinweis: {hint}</p>
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
                    <div className="word-buttons" style={{ margin: '20px' }}>
                      {letters.map((letter, index) => (
                        <button
                          key={index}
                          className={`letter-button ${clickedButtons[index] ? 'clicked' : ''}`}
                          onClick={() => handleButtonClick(index, letter)}
                        >
                          {letter}
                        </button>
                      ))}
                    </div>
               <div className="answer-section">

                 <input type="" value={currentAnswer} disabled className="answer-input"/>
                 <button className="delete-button" onClick={handleDelete}>
                   <span className="arrow-left"></span>
                  löschen
                 </button>
                 <button className="submit" onClick={handleSubmit} disabled={!currentAnswer}>einreichen</button>
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

            <Footer />
        </div>
      );
    };

    export default WordLearningPage


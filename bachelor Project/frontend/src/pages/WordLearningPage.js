import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage.css';
import Navbar from "../Navbar";
import axios from 'axios'
import imageGif from "../icons/icons8-heart-64.png"
import sadGif from "../icons/X5Na.gif"
import wowGif from "../icons/bfX.gif"
import goodGif from "../icons/5de.gif"
import Footer from "../footer";





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

    const [schwerigkeit, setschwerigkeit] = useState('');

    const [message, setMessage] = useState('');

    const [DateTime, setDateTime] = useState('');

    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);

    const [hearts, setHearts] = useState(3); // the number of hearts are 3

    const [chances, setChances] = useState(3);

    const [clickedLetters, setClickedLetters] = useState([]); // 存储已点击的字母

    const [level, setLevel] = useState(null);




useEffect(() => {
  let thisuser = localStorage.getItem('username');
  axios.get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie)
    .then(response => {
      console.log("SUCCESS", response);
      setGetMessage(response);
      const hint= response.data.map(item => item.aufgabenstellung);
      const answer= response.data.map(item => item.musterloesung);

      setHint(hint[0]);
      setWord(answer[0]);
      console.log("answer")
      console.log(answer)
      console.log(answer[0])

      // 设置初始的题目
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

    const handleContinue = async () => {
      let thisuser = localStorage.getItem('username');
      try {
        const response = await axios.get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie);
        console.log("SUCCESS", response);
        setGetMessage(response);
        const aufgabenstellungen = response.data.map(item => item.aufgabenstellung);
        const musterloesungen = response.data.map(item => item.musterloesung);
        setWord(musterloesungen[0]);
        setHint(aufgabenstellungen[0]);// 设置初始的题目

        console.log("datasource");
        console.log(dataSource);
        updateLeistung();

        let newLevel = {
          username: localStorage.getItem('username'),
          faehigkeit: calculateLevel(),
          kategorie: localStorage.getItem('kategorie'),
          zeit: DateTime
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLevel)

        };
        console.log("new level is : " +newLevel)
         console.log(newLevel.faehigkeit)

        const levelResponse = await fetch('http:///127.0.0.1:5000/addlevel', requestOptions);
        const levelData = await levelResponse.json();
        console.log(levelData);

         setLevel(levelData);

        // 重置状态
       window.location.reload(false);
      } catch (error) {
        console.log(error);
      }

    };



    function calculateLevel() {

       console.log("1111111111111111111111111111111111");
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
      const currentDate = new Date();
      const formattedDateTime = currentDate.toISOString();
      setDateTime(formattedDateTime);

      for (let i = 0; i < dataSource.length; i++) {
        let leistung = {
          username: localStorage.getItem('username'),
          aufgabestellung: getMessage.data[i].aufgabenstellung,
          score: dataSource[i].bewertung,
          kategorie: localStorage.getItem('kategorie'),
          schwerigkeit: getMessage.data[i].schwerigkeit,
          zeitpunkt: formattedDateTime
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leistung)
        };

        fetch('http://127.0.0.1:5000/addleistung', requestOptions)
          .then(response => response.json())
          .then(leistungData => {
            console.log(leistungData);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }


      return (
        <div >
          <Navbar/>
       <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
         {showScore ? (
             <div className="Aufgabe" >
               <div className="word-learning-page">
                 {score >= 4 && (
                   <React.Fragment>
                     <h2 className="title">Excellent!</h2>
                     <p className="hint">you got all the qusetions right!</p>
                     <img src={wowGif} alt="Excellent" className="score-gif" />
                   </React.Fragment>
                 )}
                 {score > 2 && score < 4 && (
                   <React.Fragment>
                     <h2 className="title">Good job!</h2>
                     <p className="hint">Not bad. Keep it up!</p>
                     <img src={goodGif} alt="Good Job" className="score-gif" />
                   </React.Fragment>
                 )}
                 {score <= 2 && (
                   <React.Fragment>
                     <h2 className="title">Oops</h2>
                     <p className="hint">You need more practice!</p>
                     <img src={sadGif} alt="Oops" className="score-gif" />
                   </React.Fragment>
                 )}
                 <p className="hint">your score is: {score}</p>

                 <button className='continue' onClick={handleContinue}>save and continue</button>
               </div>
             </div>
           ) :
           (<div className="Aufgabe">
             <div className="word-learning-page">
               <h2 className="title">Word Learning Page</h2>
               <p className="hint">Hint: {hint}</p>
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

                 <input type="" value={currentAnswer} disabled className="answer-input"/>
                 <a className="infolink" onClick={handleDelete}>Delete</a>
                 <button className="submit" onClick={handleSubmit} disabled={!currentAnswer}>Submit</button>

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


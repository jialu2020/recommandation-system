import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage2.css';
import Navbar from "../Navbar";
import axios from 'axios';
import Footer from "../footer";
import doneGif from '../icons/done.gif';
import {useNavigate} from "react-router-dom";
import loading1 from '../icons/icons8-loading.gif';



const WordLearningPage2 = () => {
  const [wordData, setWordData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [dateTime, setDateTime] = useState('');
  const [kategorie] = useState(localStorage.getItem('kategorie'));
  const [done, setDone] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [dataSource, setdataSource] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);



    useEffect(() => {
      const thisuser = localStorage.getItem('username');
      const userType = localStorage.getItem('userType');
      let apiPath = '';

      // 根据用户类型选择API路径
      if (userType === 'normal') {
        apiPath = 'http://localhost:5000/getaufgabeNormal/';
        console.log("it is normal api");
      } else if (userType === 'recommendation') {
        apiPath = 'http://localhost:5000/getaufgabe/';
        console.log("it is RS api");
      }

      if (apiPath !== '') {
        // 发起 HTTP 请求获取题目信息
        axios
          .get(apiPath + thisuser + '/' + kategorie)
          .then(response => {
            const data = response.data;

            // 处理数据，为每道题目生成错误选项
            const wordDataWithOptions = data.map(item => {
              // 获取正确答案
              const correctAnswer = item.musterloesung;
              const schwerigkeit = item.schwerigkeit;
              // 生成错误选项数组
              const options = generateWrongOptions(correctAnswer);

              // 将正确答案和选项组成一个对象
              return {
                question: item.aufgabenstellung,
                correctAnswer: correctAnswer,
                options: options,
                difficulty: schwerigkeit,
              };
            });

            // 更新题目信息数组
            setWordData(wordDataWithOptions);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching word data:', error);
            setLoading(false);
          });
      }
    }, []);

const generateWrongOptions = (correctAnswer) => {
  const options = [];
  const correctArray = correctAnswer.split('');
  const optionSet = new Set();

  const isUniqueOption = (option) => {
    return !optionSet.has(option) && option !== correctAnswer;
  };

  if (correctArray.length >= 5) {
    const middleIndex = Math.floor(correctArray.length / 2);

    for (let i = 1; i < correctArray.length - 1 && options.length < 3; i++) {
      if (i !== middleIndex && i !== middleIndex - 1) {
        for (let j = i + 1; j < correctArray.length - 1; j++) {
          if (j !== middleIndex && j !== middleIndex - 1) {
            const wrongArray = [...correctArray];
            [wrongArray[i], wrongArray[j]] = [wrongArray[j], wrongArray[i]];
            const wrongOption = wrongArray.join('');
            if (isUniqueOption(wrongOption)) {
              options.push(wrongOption);
              optionSet.add(wrongOption);
              break;
            }
          }
        }
      }
    }
  }

  while (options.length < 3) {
    const lastIndex = correctArray.length - 1;
    let randomChar;

    do {
      randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    } while (randomChar === correctArray[lastIndex] || !isUniqueOption(randomChar));

    const wrongArray = [...correctArray];
    wrongArray[lastIndex] = randomChar;
    const wrongOption = wrongArray.join('');
    options.push(wrongOption);
    optionSet.add(wrongOption);
  }

  // Shuffle the options array to ensure correct answer is not always first
  const shuffledOptions = [correctAnswer, ...options].sort(() => Math.random() - 0.5);

  return shuffledOptions;
};



  const handleAnswerSelection = (selectedOption) => {
    // 如果已经选择了选项或者已经提交答案，则不处理
    if (isOptionSelected || answerSubmitted) {
      return;
    }

    // 先设置选定的答案，然后再计算是否正确
    setSelectedAnswer(selectedOption);

    // 计算是否正确
    const isCorrect = selectedOption === wordData[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(isCorrect);

    setIsOptionSelected(true);
    setShowNextButton(true); // Enable the "OK" button when an option is selected

    setAnswerSubmitted(true);
    setShowResult(true);
  };



const handleNextQuestion = () => {
  setAnswerSubmitted(false);

  setdataSource((prevDataSource) => [
    ...prevDataSource,
    {
      num: done + 1,
      aufgabe: wordData[currentQuestionIndex].question,
      antwort: selectedAnswer,
      musterloesung: wordData[currentQuestionIndex].correctAnswer,
      bewertung:
        selectedAnswer === wordData[currentQuestionIndex].correctAnswer
          ? "richtig"
          : "falsch",
    },
  ]);

  if (currentQuestionIndex === wordData.length - 1) {
    setShowNextButton(false);
    setShowSubmitButton(true);



  } else {
    // 如果不是最后一个问题，继续下一个问题的逻辑
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer("");
    setIsOptionSelected(false);
    setShowResult(false); // 隐藏结果
    setShowNextButton(false); // 隐藏 "Next" 按钮，直到选择下一个问题的选项
  }
};


  useEffect(() => {
    console.log(dataSource);
    console.log(wordData);
  }, [dataSource]); // useEffect 钩子会在 dataSource 更新时执行


  const navigate = useNavigate();

  const handleSubmitAnswers = () => {
    setSubmitted(true);
    updateLeistung();
    addRank();


    let newlevel = {

      username: localStorage.getItem('username'),
      faehigkeit: getnewlevel(),
      kategorie: localStorage.getItem('kategorie'),
      zeit: Date().toLocaleString()
    }
    console.log("new level wlp2",newlevel)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newlevel)
    };
    fetch('http://127.0.0.1:5000/addlevel', requestOptions)
      .then(response => response.json())
      .then(newlevel);

  };


  function getnewlevel(){
    let thislevel = 0.0

    for(let i = 0; i<dataSource.length; i++){
      //dataSource[i]
      let thisschwerigkeit = wordData[i].difficulty
      let thisdiscrimination = 1
      let thisbewertung = dataSource[i].bewertung
      let gewicht = getGewicht(thisschwerigkeit)
      thislevel += thisschwerigkeit * thisdiscrimination * (thisbewertung=="richtig"?1:0) * gewicht
    }
    console.log("getnew level run ")
    console.log(thislevel)
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
function updateLeistung() {
  for (let i = 0; i < dataSource.length; i++) {
    const now = new Date();
    const localTime = now.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });

    let leistung = {
      username: localStorage.getItem('username'),
      aufgabestellung: dataSource[i].aufgabe,
      score: dataSource[i].bewertung === 'richtig',
      kategorie: localStorage.getItem('kategorie'),
      schwerigkeit: wordData[i].difficulty,
      zeitpunkt: localTime, // 使用本地时间
      typ: 'MULT'
    };
    console.log("leistung", leistung);

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

  async function addRank() {
    const username = localStorage.getItem('username');
  try {
    // 要增加的 rank 值
    const rankToAdd = 3;

    // 构建请求体，传递 rank 参数
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rank: rankToAdd }),
    };

    // 发起 POST 请求调用 addrank 方法
    const response = await fetch(`http://127.0.0.1:5000/addrank/${username}/${rankToAdd}`, requestOptions);

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

const WeiterClick = () => {
    setShowSubmit(false);
     // 随机导航到其他两个页面
   const options = ['/course/aufgabe', '/course/game'];
   const randomIndex = Math.floor(Math.random() * options.length);
   navigate(options[randomIndex]);
   setdataSource([]);


}



return (
  <div>
    <Navbar />
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <div className="quiz-content">
        {loading ? (
          // 根据loading状态来显示加载指示器
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <img src={loading1} alt="Loading..." />
          </div>
        ) : submitted ? ( // 如果已经提交了答案，显示成绩结算
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img style={{ margin: "0 auto" }} src={doneGif} alt="Done" />
            <p>Herzlichen Glückwunsch, du hast alle Aufgaben erfüllt!</p>
            <p>Du hast bei dieser Übung 5 Punkte erreicht.</p>

            <button type="button" onClick={WeiterClick}>Weiter</button>
          </div>
        ) : currentQuestionIndex < wordData.length ? (
          // 显示问题和答案选项
          <div>
            <h2 className="title" style={{ marginTop: '15px' }}>Wähle
              das englische Wort, das die gleiche Bedeutung hat wie das Untenstehende.</h2>
            <p>Aufgabe {currentQuestionIndex + 1}: {wordData[currentQuestionIndex].question}</p>
            <div className="options-container">
              {wordData[currentQuestionIndex].options.map((option, i) => (
                <div
                  key={i}
                  className={`option-rectangle ${
                    selectedAnswer === option
                      ? isAnswerCorrect
                        ? 'selected-option-correct'
                        : 'selected-option-incorrect'
                      : ''
                  } ${selectedAnswer === option ? 'selected-option' : ''}`}
                  onClick={() => !answerSubmitted && handleAnswerSelection(option)}
                >
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
            {showResult && (
              <p style={{ color: selectedAnswer === wordData[currentQuestionIndex].correctAnswer ? 'green' : 'red' }}>{selectedAnswer === wordData[currentQuestionIndex].correctAnswer ?
                'Richtige Antwort!' : 'Falsche Antwort, die richtige Antwort lautet: ' + wordData[currentQuestionIndex].correctAnswer}</p>
            )}
            {showResult && showNextButton && (
              <button type="button" onClick={handleNextQuestion}>
                OK
              </button>
            )}
            {showSubmitButton && (
            <button type="button" onClick={handleSubmitAnswers}>
              Einreichen
            </button>
             )}

          </div>
        ) : (
          // 当所有问题都回答完毕后，显示成绩结算
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* 成绩结算内容 */}
            <img style={{ margin: "0 auto" }} src={doneGif} alt="Done" />
            <p>Herzlichen Glückwunsch, Sie haben alle Aufgaben erfüllt!</p>
            <p>Mit dieser Übung haben Sie 5 Punkte erreicht.</p>

            <button type="button" onClick={WeiterClick}>Weiter</button>
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
);


};

export default WordLearningPage2;

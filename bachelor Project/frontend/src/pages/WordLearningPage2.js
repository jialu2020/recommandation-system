import React, {useEffect, useMemo, useState} from 'react';
import './WordLearningPage2.css';
import Navbar from "../Navbar";
import axios from 'axios';
import Footer from "../footer";
import doneGif from '../icons/done.gif';

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


  useEffect(() => {
    const thisuser = localStorage.getItem('username');

    // 发起 HTTP 请求获取题目信息
    axios
      .get('http://localhost:5000/getaufgabe/' + thisuser + '/' + kategorie)
      .then(response => {
        const data = response.data;

        console.log(response.data)
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
            difficulty:schwerigkeit,
          };
        });

        // 更新题目信息数组
        setWordData(wordDataWithOptions);
      })
      .catch(error => {
        console.error('Error fetching word data:', error);
      });
  }, []);

  const generateWrongOptions = (correctAnswer) => {
    const options = [];
    const correctArray = correctAnswer.split(''); // 将正确答案转换为字符数组
    const optionSet = new Set();

    // 处理长度大于 5 的单词，调换中间的 2 个字母作为错误选项
    if (correctArray.length > 5) {
      const middleIndex = Math.floor(correctArray.length / 2);
      const temp1 = correctArray[middleIndex];
      const temp2 = correctArray[middleIndex - 1];
      correctArray[middleIndex] = temp2;
      correctArray[middleIndex - 1] = temp1;
    }
    // 处理长度小于 5 的单词，随机替换中间的一个字母作为错误选项
    else if (correctArray.length < 5) {
      const middleIndex = 1;
      const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // 随机生成一个小写字母
      correctArray[middleIndex] = randomChar;
    }

    // 先将正确答案加入选项数组
    options.push(correctAnswer);

    // 生成其他错误选项
    while (options.length < 3) {
      // 随机选择一个位置
      const index1 = Math.floor(Math.random() * correctArray.length);
      // 随机选择该位置的相邻位置
      const index2 = (index1 + 1) % correctArray.length;

      // 交换选中的两个位置的字母
      [correctArray[index1], correctArray[index2]] = [correctArray[index2], correctArray[index1]];

      // 将交换后的字符数组转换回字符串，并加入选项数组（但确保不重复加入正确答案和已有选项）
      const option = correctArray.join('');
      if (option !== correctAnswer && !optionSet.has(option)) {
        options.push(option);
        optionSet.add(option);
      }
    }

    // 随机洗牌选项数组，确保正确答案不在第一位
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
  };

  const handleAnswerSelection = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    setIsOptionSelected(true);
    setShowNextButton(true); // Enable the "OK" button when an option is selected
  };


   const handleOkClick = () => {
    // Show the result for the current question
     setAnswerSubmitted(true);
    setShowResult(true);
    setShowNextButton(true); // Disable the "OK" button after clicking
  };


  const handleNextQuestion = () => {

     setAnswerSubmitted(false);
    // 将学生的答题情况添加到 dataSource 中
    setdataSource(prevDataSource => [
      ...prevDataSource,
      {
        num: done + 1,
        aufgabe: wordData[currentQuestionIndex].question,
        antwort: selectedAnswer,
        musterloesung: wordData[currentQuestionIndex].correctAnswer,
        bewertung: selectedAnswer === wordData[currentQuestionIndex].correctAnswer ? 'richtig' : 'falsch'
      }
    ]);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer('');
    setIsOptionSelected(false);
    setShowResult(false); // Hide the result
    setShowNextButton(false); // Hide the "Next" button until an option is selected for the next question
  };

  useEffect(() => {
    console.log(dataSource);
    console.log(wordData);
  }, [dataSource]); // useEffect 钩子会在 dataSource 更新时执行

 const handleSubmitAnswers = () => {
    updateLeistung();
    addRank();


    let newlevel = {

      username: localStorage.getItem('username'),
      faehigkeit: getnewlevel(),
      kategorie: localStorage.getItem('kategorie'),
      zeit: Date().toLocaleString()
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newlevel)
    };
    fetch('http://127.0.0.1:5000/addlevel', requestOptions)
      .then(response => response.json())
      .then(newlevel);

    setShowSubmit(false);

    window.location.reload(false);

    setdataSource([]);

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
  function updateLeistung(){
    for(let i=0; i<dataSource.length; i++){

      let leistung =
        {
          username: localStorage.getItem('username'),
          aufgabestellung: dataSource[i].aufgabe,
          score : dataSource[i].bewertung === 'richtig',
          kategorie : localStorage.getItem('kategorie'),
          schwerigkeit : wordData[i].difficulty,
          zeitpunkt : Date().toLocaleString()

        };
      console.log("leisting")
      console.log(leistung)

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


  // 渲染页面
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <div className="quiz-content">
          <h2 className="title" style= {{ marginTop : '15px' }}>multi-choice</h2>
          {currentQuestionIndex < wordData.length ? (
            <div>
              <p>Aufgabe {currentQuestionIndex + 1}: {wordData[currentQuestionIndex].question}</p>
              <div className="options-container">
                {wordData[currentQuestionIndex].options.map((option, i) => (
                  <div
                     key={option}
                   className={`option-rectangle ${selectedAnswer === option ? 'selected-option' : ''}`}
                     onClick={() => !answerSubmitted && handleAnswerSelection(option)} // 检查标志位来决定是否允许点击选项
                    >
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
              {showResult && (
                <p>{selectedAnswer === wordData[currentQuestionIndex].correctAnswer ? 'Richtige Antwort!' : 'Falsche Antwort, die richtige Antwort lautet: ' + wordData[currentQuestionIndex].correctAnswer }</p>
              )}
              {!showResult && showNextButton && (
                <button type="button" onClick={handleOkClick}>
                  OK
                </button>
              )}
              {showResult && showNextButton && (
                <button type="button" onClick={handleNextQuestion}>
                  Next
                </button>
              )}
            </div>
          ) : (
            <div>
               <img style={{ margin: "0 auto" }} src={doneGif} alt="Done" />
              <p>Herzlichen Glückwunsch, Sie haben alle Aufgaben erfüllt!</p>
              <p>Mit dieser Übung haben Sie 5 Rank Punkte erreicht.</p>
              {!showSubmit && (
                <button type="button" onClick={handleSubmitAnswers}>submit</button>
              )}
            </div>
          )}
        </div>
      </div>
      {showSubmit && (
        <div>
          <p>答案提交成功！</p>
          <p>得分：{score}</p>
          <p>提交时间：{dateTime}</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WordLearningPage2;


import './AufgabeStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BaseTable } from "ali-react-table";
import Navbar from "../Navbar";
import Footer from "../footer";
import {ArtColumn} from "ali-react-table";
import {useNavigate} from "react-router-dom";


function Aufgabe() {

  const columns: ArtColumn[] = [
    { code: 'num', name: 'Number', width: 10},
    { code: 'aufgabe', name: 'Aufgabe', width: 20, align: 'right'},
    { code: 'antwort', name: 'Deine Antwort', width: 10, align: 'right' },
    { code: 'musterloesung', name: 'Lösung', width: 10, align: 'right' },
    { code: 'bewertung', name: 'Bewertung', width: 10, align: 'right' }
  ]

  const [dataSource, setdataSource] = useState([]);

  const [getMessage, setGetMessage] = useState({})

  const [currentQuestion, setCurrentQuestion] = useState(0);

	const [showScore, setShowScore] = useState(false);

	const [showSubmit, setShowSubmit] = useState(false);

	const [done, setDone] = useState(0);

	const [kategorie, setkategorie] = useState(localStorage.getItem('kategorie'));

  const [message, setMessage] = useState('');

	const [DateTime, setDateTime] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };


  useEffect(() => {
    const userType = localStorage.getItem('userType');

    let apiPath = ''; // Initialize the API path variable based on userType
    if (userType === 'normal') {
      apiPath = 'http://localhost:5000/getaufgabeNormal/';
      console.log("it is normal api")
    } else if (userType === 'recommendation') {
      apiPath = 'http://localhost:5000/getaufgabe/';
      console.log("it is RS api")
    }

    if (apiPath !== '') {
      let thisuser = localStorage.getItem('username');
      axios.get(apiPath + thisuser + '/' + kategorie).then(response => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      }).catch(error => {
        console.log(error);
      });
      setShowSubmit(false);
    }
  }, []); //


  const NextClick = () => {

    setDone(done + 1);

    setdataSource([
    ...dataSource,
      {
      num: done + 1,
      aufgabe: getMessage.data[currentQuestion].aufgabenstellung,
      antwort: message,
      musterloesung: getMessage.data[currentQuestion].musterloesung,
      bewertung: message.toLowerCase() === getMessage.data[currentQuestion].musterloesung.toLowerCase() ? 'richtig' : 'falsch'

    }
    ])

		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < getMessage.data.length) {
			setCurrentQuestion(nextQuestion);

			setMessage('');

		} else {
    setDateTime(Date().toLocaleString());

		setShowSubmit(true);

		}

  };



  function updateLeistung(){
  for(let i=0; i<dataSource.length; i++){

      let leistung = {username: localStorage.getItem('username'),
              aufgabestellung: dataSource[i].aufgabe,
              score : dataSource[i].bewertung === 'richtig',
              kategorie : localStorage.getItem('kategorie'),
              schwerigkeit : getMessage.data[i].schwerigkeit,
              zeitpunkt :  Date().toLocaleString()
      };
      console.log("leistung aufgabe", leistung)
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

  const BackClick = () => {

    if(dataSource !== null){

    setDone(done-1);

    setdataSource(current =>
      current.filter(dataSource => {
        return dataSource.aufgabe !== getMessage.data[currentQuestion - 1].aufgabenstellung;
      }),
    );

    const nextQuestion = currentQuestion - 1;

    setCurrentQuestion(nextQuestion);

		setMessage('');

		setShowSubmit(false);

		}
  };

  const Submit = () =>{

    updateLeistung();

  let newlevel = {
    username: localStorage.getItem('username'),
    faehigkeit: getnewlevel(),
    kategorie: localStorage.getItem('kategorie'),
    zeit: Date().toLocaleString()
  };

  console.log("new level", newlevel);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newlevel)
  };

  fetch('http://localhost:5000/addlevel', requestOptions)
    .then(response => response.json())
    .then(newlevel);

    addRank();

    setShowSubmit(false);

		setShowScore(true);

		setMessage('');

  }


    const navigate = useNavigate();

const WeiterClick = () => {
  const options = ['/course/multiple-choice', '/course/game'];
  const randomIndex = Math.floor(Math.random() * options.length);
  navigate(options[randomIndex]);
  setdataSource([]);
};


  function getnewlevel(){
  let thislevel = 0.0

  for(let i = 0; i<dataSource.length; i++){
  //dataSource[i]
    let thisschwerigkeit = getMessage.data[i].schwerigkeit
    let thisdiscrimination = 1
    let thisbewertung = dataSource[i].bewertung
    let gewicht = getGewicht(thisschwerigkeit)

    thislevel += thisschwerigkeit * thisdiscrimination * (thisbewertung=="richtig"?1:0) * gewicht
  }
  console.log("the  new level")
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

async function addRank() {
    const username = localStorage.getItem('username');
  try {
    // 要增加的 rank 值，这里设置为 10
    const rankToAdd = 5;

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


  return (
<div>
  <Navbar />

  <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>


    {showScore ? (

      <div className="quiz-content" >
        <div className='score-section'>
          {getMessage.status === 200 ? (
            <div className='score-text'>
              Du hast {dataSource.filter(item => item.antwort === item.musterloesung).length} von {getMessage.data.length} Fragen richtig beantwortet.
            </div>
          ) : (<h3>No Response</h3>)}
           <p>Mit dieser Übung haben Sie 5 Punkte erreicht.</p>
          <div className='score-table'>
            <BaseTable dataSource={dataSource} columns={columns} />
          </div>
          <div>
            <button className="button mt10" onClick={WeiterClick}>Weiter</button>
          </div>
        </div>

      </div>


    ) : (
      <div>

        <div className="quiz-content" >

           <h2 className="title">Buchstabiere die englischen Wörter entsprechend den Hinweisen</h2>
          {getMessage.status === 200 ? (

            <div className='question-section' >

              <div style={{ textAlign: 'center' }}>
                  <span className="title">Frage: {currentQuestion + 1}/{getMessage.data.length}</span>
              </div>

              <div className='question-text'> <span> Hinweis: {getMessage.data[currentQuestion].aufgabenstellung} </span></div>
              <span>(Der Anfangsbuchstabe des Wortes : {getMessage.data[currentQuestion].musterloesung.charAt(0)})</span>
            </div>
          ) : (<h3>No Response</h3>)}
          <div className='answer-section'>
            <div className='input-section'>
                <input
                  className="input"
                  id="message"
                  name="message"
                  onChange={handleChange}
                  value={message}
                />
            </div>
            <div className="buttons-container">
              <div>
                {done !== 0 && !showSubmit && (
                  <button className="back" disabled={done === 0} onClick={BackClick}>
                    Zurück
                  </button>
                )}
              </div>
              <div>
                {!showSubmit ? (
                  <button className="mt10" type="button" disabled={!message} onClick={NextClick}>Nächste</button>
                ) : (
                  <button className="mb10" onClick={Submit}>Einreichen</button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    )}
  </div>

  <div>
    <Footer />
  </div>


</div>

  );
}

export default Aufgabe;


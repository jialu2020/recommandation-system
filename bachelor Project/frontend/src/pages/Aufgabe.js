
import './AufgabeStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BaseTable } from "ali-react-table";
import Navbar from "../Navbar";
import Footer from "../footer";
import {ArtColumn} from "ali-react-table";


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

	const [score, setScore] = useState(0);

	const [done, setDone] = useState(0);

	const [kategorie, setkategorie] = useState(localStorage.getItem('kategorie'));

	const [schwerigkeit, setschwerigkeit] = useState('');

	const [message, setMessage] = useState('');

	const [DateTime, setDateTime] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };



useEffect(()=>{
//setkategorie(localStorage.getItem('kategorie'))
//
//    fetch('http://127.0.0.1:5000/getaufgabe/' + kategorie)
//        .then((response) => response.json())
//        .then((data) => console.log(data));
//    setkategorie(localStorage.getItem('kategorie'))

    let thisuser = localStorage.getItem('username')

    axios.get('http://localhost:5000/getaufgabe/'+ thisuser + '/' +kategorie).then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

    setShowSubmit(false);

 }, [])

  const NextClick = () => {

    setDone(done + 1);

    setdataSource([
    ...dataSource,
    {num: done+1,
    aufgabe: getMessage.data[currentQuestion].aufgabenstellung,
    antwort: message,
    musterloesung: getMessage.data[currentQuestion].musterloesung,
    bewertung: message === getMessage.data[currentQuestion].musterloesung?'richtig':'falsch'}
    ])

    //setScore(dataSource.filter(item => item.antwort === item.musterloesung).length);

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

//      console.log(getMessage.data[i].schwerigkeit+"***")

      let leistung = {username: localStorage.getItem('username'),
              aufgabestellung: getMessage.data[i].aufgabenstellung,
              score : dataSource[i].bewertung === 'richtig',
              kategorie : localStorage.getItem('kategorie'),
              schwerigkeit : getMessage.data[i].schwerigkeit,
              zeitpunkt : DateTime};

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

		setShowScore(true);

		setMessage('');

		setShowSubmit(false);
  }

  const WeiterClick = () => {

//Leistung(username, aufgabestellung, score, kategorie, schwerigkeit, zeitpunkt)
//  updateLeistung();


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

  setShowSubmit(false);

  window.location.reload(false);

  setdataSource([]);
  }

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




  return (
<div>
  <Navbar />

  <div  style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>


    {showScore ? (

      <div className="quiz-content" >
        <div className='score-section'>
          {getMessage.status === 200 ? (
            <div className='score-text'>
              You scored {dataSource.filter(item => item.antwort === item.musterloesung).length} out of {getMessage.data.length}
            </div>
          ) : (<h3>No Response</h3>)}
          <div className='score-table'>
            <BaseTable dataSource={dataSource} columns={columns} />
          </div>
          <div>
            <button className="button" onClick={WeiterClick}>Weiter</button>
          </div>
        </div>

      </div>


    ) : (
      <div>

        <div className="quiz-content" >
          {getMessage.status === 200 ? (
            <div className='question-section' >

              <h2 className="title"> Spelling</h2>

              <div className='question-count'>
                <span>Question({kategorie}) {currentQuestion + 1}</span>/{getMessage.data.length}
              </div>
              <div className='question-text'>{getMessage.data[currentQuestion].aufgabenstellung}</div>
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
                {done !== 0 && <button className="back" disabled={done === 0} onClick={BackClick}> Back</button>}
              </div>
              <div>
                {!showSubmit ? (
                  <button type="button" disabled={!message} onClick={NextClick}>Next</button>
                ) : (
                  <button type="button" onClick={Submit}>Submit</button>
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


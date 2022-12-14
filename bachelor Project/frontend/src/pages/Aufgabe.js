
//import logo from './logo.svg';
import './AufgabeStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BaseTable } from "ali-react-table";
//import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";


function Aufgabe() {



    const [dataSource, setdataSource] = useState([]);

//const [questions, setquestions] = useState([]);

  const columns: ArtColumn[] = [
    { code: 'antwort', name: 'Deine Antwort', width: 10 },
    { code: 'loesung', name: 'Lösung', width: 10, align: 'right' },
    { code: 'bewertung', name: 'Bewertung', width: 10, align: 'right' }
  ]

//  const questions = [
//		{questionText: '1+1=?',
//			answerOptions: '2'},
//		{questionText: '1*1=?',
//			answerOptions:'1'},
//		{questionText: '1-1=?',
//			answerOptions: '0'},
//		{questionText: 'How many Harry Potter books are there?',	answerOptions: '7'},
//	];

  const [getMessage, setGetMessage] = useState({})

  const [currentQuestion, setCurrentQuestion] = useState(0);

	const [showScore, setShowScore] = useState(false);

	const [score, setScore] = useState(0);

	const [message, setMessage] = useState('');

 // const [updated, setUpdated] = useState(message);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };


useEffect(()=>{
    axios.get('http://localhost:5000/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })


// const Aufgabesmenge = 0;
// for(;Aufgabesmenge < getMessage.data.Aufgabestellung.length;Aufgabesmenge++)
// //getMessage.data.Aufgabestellung.length)
//
//setquestions(
//[
//...questions,
//{questionText: getMessage.data.Aufgabestellung[Aufgabesmenge], answerOptions: getMessage.data.Loesung[Aufgabesmenge]}
//]
//)

//questions = [
//{Aufgabestellung: getMessage.data.Aufgabestellung[0], Loesung: getMessage.data.Loesung[0]},
//{Aufgabestellung: getMessage.data.Aufgabestellung[1], Loesung: getMessage.data.Loesung[1]},
//{Aufgabestellung: getMessage.data.Aufgabestellung[2], Loesung: getMessage.data.Loesung[2]}
//];

 }, [])


  const NextClick = () => {
    if (message === getMessage.data.Loesung[currentQuestion]) {
			setScore(score + 1);
		}

    setdataSource([
    ...dataSource,
    { antwort: message, loesung: getMessage.data.Loesung[currentQuestion], bewertung: message === getMessage.data.Loesung[currentQuestion]?'richtig':'falsch'}
    ])

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < getMessage.data.Loesung.length) {
			setCurrentQuestion(nextQuestion);
			setMessage('');
		} else {
			setShowScore(true);
		setMessage('');
		}
  };

  const WeiterClick = () => {
  window.location.reload(false);
  }



  return (
//    <div className="App">
//      <header className="App-header">
//        <p>React + Flask Test</p>
//
//        <div>
// {
// getMessage.status === 200 ?
//          <h3>{getMessage.data.Loesung[1]}</h3>
//         :
//         <h3>No Response</h3>
//         }
//  </div>
//      </header>
//    </div>
<div>
 <Navbar/>
    <div className='Aufgabe'>

			{showScore? (
			<div className = 'score-section'>
				{getMessage.status === 200 ?(
				<div className='score-text'>
					You scored {score} out of {getMessage.data.Aufgabestellung.length}
        </div>
                )
       :(<h3>No Response</h3>)}
        <div className='score-table'>
          <BaseTable dataSource={dataSource} columns={columns} />
        </div>
		    <div>
					<button type= "submit"  onClick={WeiterClick}>Weiter</button>
        </div>
	    </div>
			) : (
			<div>
			{getMessage.status === 200 ?(
					<div className='question-section' >
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{getMessage.data.Loesung.length}
						</div>
						<div className='question-text'>{getMessage.data.Aufgabestellung[currentQuestion]}</div>
					</div>
      )
		:(<h3>No Response</h3>)}
		<div>
      <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}
      />
</div>
      <h2>Message: {message}</h2>



      <button type= "submit" disabled={!message} onClick={NextClick}>Next</button>

    </div>

			)}

		</div>
		</div>
  );
}

export default Aufgabe;


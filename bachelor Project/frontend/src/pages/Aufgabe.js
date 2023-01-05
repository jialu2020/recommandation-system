//import logo from './logo.svg';
import './AufgabeStyle.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BaseTable } from "ali-react-table";
//import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

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

	const [score, setScore] = useState(0);

	const [done, setDone] = useState(0);

	const [kategorie, setkategorie] = useState('');

	const [schwerigkeit, setschwerigkeit] = useState('');

	const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

useEffect(()=>{
    axios.get('http://localhost:5000/getaufgabe').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

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

		setShowScore(true);

		setMessage('');
		}
  };

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

		}
  };

  const WeiterClick = () => {

//axios.post('/add', {
//    username: 'wzy2',
//    password: '123456'
//  })
//  .then(function (response) {
//    console.log(response);
//  })
//  .catch(function (error) {
//    console.log(error);
//  });

const data = {username: 'wzy3', kategorie : getMessage.data[0].kategorie , score : score, done : 3, schwerigkeit : getMessage.data[0].schwerigkeit};

//fetch('http://127.0.0.1:5000/add', {
//  method: 'POST',
//  headers: {
//    'Content-Type': 'application/json',
//  },
//  body: JSON.stringify(data),
//})
//  .then((response) => response.json())
//  .then((data) => {
//    console.log('Success:', data);
//  })
//  .catch((error) => {
//    console.error('Error:', error);
//  });
const username = data.username
const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch('http://127.0.0.1:5000/updateleistung/' + username, requestOptions)
        .then(response => response.json())
        .then(data);

  window.location.reload(false);
  }



  return (
<div>
 <Navbar/>
    <div className='Aufgabe'>

			{showScore? (
			<div className = 'score-section'>
				{getMessage.status === 200 ?(
				<div className='score-text'>
					You scored {dataSource.filter(item => item.antwort === item.musterloesung).length} out of {getMessage.data.length}
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
							<span>Question {currentQuestion + 1}</span>/{getMessage.data.length}
						</div>
						<div className='question-text'>{getMessage.data[currentQuestion].aufgabenstellung}</div>
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
 {done!==0 &&
 <button type= "submit"  disabled={done===0} onClick={BackClick}> Back</button>
 }   </div>

			)}

		</div>
		</div>
  );
}

export default Aufgabe;


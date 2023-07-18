import "./MyprofileStyle.css";
import EditProfile from "./EditProfile";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Navbar";
import star from "../icons/star.png"
import moon from "../icons/crescent-moon.png"
import sun from "../icons/sun.png"
import Footer from "../footer";


function Myprofile() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [editMode, setEditMode] = useState(false);
  const [mysub, setmysub] = useState([]);
  const [levels, setLevels] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getlevel/${username}`)
      .then(response => {
        console.log("SUCCESS", response);
        const levelData = response.data;
        if (Array.isArray(levelData)) {
          setLevels(levelData);
        } else {
          console.error("Level data is not a valid array:", levelData);
        }
      })
      .catch(error => {
        console.log(error);
      });

  }, [username]);



  function changeToFalse() {
    setEditMode(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function getLevelIcon(level) {
    switch (true) {
      case level < 0.5:
        return <img src={star} alt="Star" />;
      case level >= 0.5 && level < 1:
        return (
          <>
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />
          </>
        );
      case level >= 1 && level < 1.5:
        return (
          <>
            <img src={moon} alt="Moon" />

          </>
        );
      case level >= 1.5 && level < 2:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={star} alt="Star" />

          </>
        );
      case level >= 2 && level < 2.5:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />

          </>
        );
      case level >= 2.5 && level < 3:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={moon} alt="Moon" />


          </>
        );
      case level >= 3 && level < 3.5:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={moon} alt="Moon" />
            <img src={star} alt="Star" />

          </>
        );

        case level >= 3.5 && level < 4:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={moon} alt="Moon" />
            <img src={star} alt="Star" />
            <img src={star} alt="Star" />

          </>
        );
      case level >= 4 && level < 4.5:
        return (
          <>
            <img src={moon} alt="Moon" />
            <img src={moon} alt="Moon" />
            <img src={moon} alt="Moon" />

          </>
        );
      case level >= 4.5:
        return (
          <>
            <img src={sun} alt="Sun" />


          </>
        );





      default:
        return null;
    }
  }





return (
  <div>
    <Navbar />
    {editMode ? (
      <div>
        <EditProfile changeToFalse={changeToFalse} />
      </div>
    ) : (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <div className="user-info-container">
          <form onSubmit={handleSubmit}>
            <div className="username-password">
              <h3>My Account:</h3>
              <span>Username:</span> {localStorage.getItem('username')}
            </div>
            <div className="username-password">
              <span>Password:</span> {localStorage.getItem('password')}
            </div>
            <div id="buttonclass">
              <button className="link-btn" onClick={() => setEditMode(true)}>
                Edit password
              </button>
            </div>
          </form>
        </div>
        <div className="level-list">
          <h3>My Levels:</h3>
          <ul>
            {levels.map(level => (
              <li key={level.id}>
                {level.kategorie} : <span>{getLevelIcon(level.faehigkeit)}</span>
              </li>
            ))}
          </ul>
          <p>
            <a  className="infolink" href="#" onClick={() => setShowExplanation(!showExplanation)}>
              To view the level icon explanations, click here.
            </a>
          </p>
          {showExplanation && (
            <div className="explanation-box">
              <h3>Explanation for level icons:</h3>
              <p>You get a star every time you upgrade.</p>
              <p>for example :</p>
              <ul>
                <li>0 - 0.5: One star</li>
                <li>0.5 - 1: Two stars</li>
                <li>...</li>
                <p>Embrace the journey of growth and leveling up! With each step, you'll unlock new icons that symbolize your progress and achievements!!</p>
                {/* Add more explanations for other levels */}
              </ul>
            </div>
          )}




        </div>
      </div>
    )}

    <div>
      <Footer />
    </div>

  </div>
);


}

export default Myprofile;

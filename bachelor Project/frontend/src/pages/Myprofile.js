import "./MyprofileStyle.css";
import EditProfile from "./EditProfile";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Navbar";
import star from "../icons/star.png"
import moon from "../icons/crescent-moon.png"
import sun from "../icons/sun.png"
import Footer from "../footer";
import {useNavigate} from "react-router-dom";


function Myprofile() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [editMode, setEditMode] = useState(false);
  const [mysub, setmysub] = useState([]);
  const [levels, setLevels] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://www.indilearnlj.de/backend/getlevel/${username}`)
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



    function handleDeleteAccount() {
    const shouldDelete =
      window.confirm
      ("Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Dadurch werden alle Informationen über das Konto gelöscht und können nicht rückgängig gemacht werden.");

    if (shouldDelete) {
      // 向服务器发送 DELETE 请求删除用户账号
      axios.delete(`http://www.indilearnlj.de/backend/delete-username/${username}`)
        .then(response => {
          console.log("SUCCESS", response);
          // 处理删除成功的情况，例如显示成功消息，并执行注销操作
          alert("Ihr Konto Info wurde erfolgreich gelöscht.");
          // 这里可以执行用户注销的操作，比如跳转到登录页面或清除用户的登录状态
           handleLogout();
        })
        .catch(error => {
          console.log(error);
          // 处理删除失败的情况，例如显示错误消息
          alert("Bei der Löschung Ihres Kontos ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.");
        });
    }
  }

function handleDeleteUserName() {
  // 打开一个新窗口，显示终止信息
   const terminationPageUrl = "./termination";

    window.open(terminationPageUrl, "_blank");

}

  const handleLogout = () => {
      // 执行退出账号操作

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('password');
       localStorage.removeItem('userType');
      navigate('/'); // 退出账号后跳转回登录页面或其他适当的页面
    };

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
      <div className="profile-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <div className="user-info-container">

          <form onSubmit={handleSubmit}>

            <div>
                <h3 className= "title2">Mein Konto:</h3>
            <div className="username-password">
              <span>Username:</span> {localStorage.getItem('username')}
            </div>
            <div className="username-password">
              <span>Passwort:</span> {localStorage.getItem('password')}
              <button className="link-btn" style={{ background: 'none', border: 'none', color: 'grey', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setEditMode(true)}>
                Passwort ändern
              </button>

            </div>
            <div id="buttonclass" style={{ marginBottom : '20px', marginTop: '50px'}}>

              <button className="delete-button1" onClick={handleDeleteAccount}>
                Konto deaktivieren
              </button>

               <button className="delete-button1" onClick={handleDeleteUserName}>
                Projektstudien beenden
              </button>

            </div>
            </div>

          </form>
        </div>
        <div className="level-list">
          <h3 className= "title2">Mein Level:</h3>

          <ul>
            {levels.map(level => (
              <li key={level.id}>
                {level.kategorie} : <span>{getLevelIcon(level.faehigkeit)}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginBottom : '15px', marginTop: '25px'}}>
            <a  className="infolink" href="#" onClick={() => setShowExplanation(!showExplanation)}>
              Um die Erklärungen zu den Symbolen zu sehen, klicken Sie hier
            </a>
          </p>
          {showExplanation && (
            <div className="explanation-box">
              <h3>Erläuterung der Level-Symbole:</h3>
              <p>Je mehr Fragen du richtig beantworten, desto höher ist dein Fähigkeitswert. </p>

              <p>Jedes Mal, wenn du aufsteigst, erhaltst du einen Stern.</p>
              <ul>
                <p>Mit jedem Schritt schaltest du neue Symbole frei, die deinen Fortschritt und deine Erfolge symbolisieren</p>
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

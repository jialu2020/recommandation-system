import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../footer";
import './UserRankings.css';

function UserRankings() {
  const [rankings, setRankings] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleExplanationClick = () => {
    setShowExplanation(!showExplanation);
  };

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch('http://127.0.0.1:5000/getallranks');
        if (!response.ok) {
          throw new Error('请求失败');
        }
        const data = await response.json();
        // Sort the rankings array in descending order based on the rank value
        const sortedRankings = data.sort((a, b) => b.rank - a.rank);
        setRankings(sortedRankings);
      } catch (error) {
        console.error('出现错误：', error);
      }
    }

    fetchRankings();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="user-rankings-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <h1 className="title">Rangliste</h1>
        <p >
          Zur Erläuterung der Ranglisten, {' '}
          <a className="infolink" href="#" onClick={handleExplanationClick}>
            {showExplanation ? 'Erläuterung ausblenden' : 'Click hier'}
          </a>
        </p>
        {showExplanation && (
          <div className="explanation-textbox" style={{ marginLeft : "20px"}}>
            <p style={{ marginLeft : "10px"}}>Jedes Mal, wenn eine Frage in Lernen beantwortet wird, erhält man eine bestimmte Anzahl von Rangpunkten.
            </p>
            <p style={{ marginLeft : "10px"}}>
               Dieser Rang zeigt nur an, wie aktiv der Benutzer ist.
            </p>
          </div>
        )}

        <ol className="user-rankings-list">
          {rankings.map((user, index) => (
            <li
              key={user.username}
              className={`user-ranking-item ${index < 3 ? 'top-three' : ''}`}
            >
              <span>{user.username}</span> - Rank: {user.rank}
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </div>
  );
}

export default UserRankings;

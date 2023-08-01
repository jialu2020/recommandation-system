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
        <h1 className="title">User Rankings</h1>
        <p >
          For an explanation of the rankings,{' '}
          <a className="infolink" href="#" onClick={handleExplanationClick}>
            {showExplanation ? 'Erläuterung ausblenden' : 'Click hier'}
          </a>
        </p>
        {showExplanation && (
          <div className="explanation-textbox">
            {/* Your explanation text here */}
            This is the explanation text.
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

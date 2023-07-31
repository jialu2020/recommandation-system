import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import Footer from "../footer";

function UserRankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    async function fetchRankings() {
      try {
        const response = await fetch('http://127.0.0.1:5000/getallranks');
        if (!response.ok) {
          throw new Error('请求失败');
        }
        const data = await response.json();
        setRankings(data);
      } catch (error) {
        console.error('出现错误：', error);
      }
    }

    fetchRankings();
  }, []);

  return (

    <div>
        <Navbar />
         <div className="Aufgabe" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
      <h1>User Rankings</h1>
      <ol>
        {rankings.map((user) => (
          <li key={user.username}>
            {user.username} - Rank: {user.rank}
          </li>
        ))}
      </ol>
    </div>
        <div>
            <Footer />
          </div>
    </div>

  );
}

export default UserRankings;

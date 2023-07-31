// Ranklist.js
import React from 'react';
import Navbar from "../Navbar";

const users = [
  { id: 1, name: 'John Doe', score: 95 },
  { id: 2, name: 'Jane Smith', score: 88 },
  { id: 3, name: 'Michael Johnson', score: 78 },
  // Add more users as needed
];

const Ranklist = () => {
  return (
    <div>
     <Navbar />
          <div>
      <h1>Ranklist</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>

  );
};

export default Ranklist;

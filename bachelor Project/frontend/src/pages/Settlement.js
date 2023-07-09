import React from 'react';
import './Settlement.css';

const SettlementPage = ({ score, totalQuestions }) => {
  return (
    <div className="settlement-page">
      <h2>Settlement Page</h2>
      <p>Score: {score}</p>
      <p>Total Questions: {totalQuestions}</p>
    </div>
  );
};

export default SettlementPage;

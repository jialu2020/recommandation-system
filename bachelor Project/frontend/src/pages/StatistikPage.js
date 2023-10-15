import React, { useEffect, useState } from 'react';
import BarChart from "./StatisticsChart";
import Navbar from "../Navbar";
import Footer from "../footer";

const StudentStatisticsPage = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [statisticsData, setStatisticsData] = useState({});
  const [accuracyData, setAccuracyData] = useState({});


  useEffect(() => {
    // 使用Promise.all同时发起两个API请求
    Promise.all([
      fetch(`http://www.indilearnlj.de/backend/accuracy/correct/${username}`).then((response) => response.json()),
      fetch(`http://www.indilearnlj.de/backend/accuracy/incorrect/${username}`).then((response) => response.json()),
    ])
      .then(([statisticsData, accuracyData]) => {

        if (Object.keys(statisticsData).length > 0 && Object.keys(accuracyData).length > 0) {
          console.log('correct:', statisticsData);
          console.log('incorrect:', accuracyData);

          setStatisticsData(statisticsData);
          setAccuracyData(accuracyData);
        } else {
          console.error('API data is empty.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div style={{fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f2f5'}}>
      <Navbar/>

      <div
        className="user-rankings-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '90vh',
          padding: '20px',
        }}
      >
        <div style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          <h1 style={{fontSize: '24px', marginBottom: '20px', color: '#1877f2'}}>Nutzungshäufigkeit</h1>
          <p style={{fontSize: '16px', marginBottom: '20px', color: '#333'}}>Dieses Diagramm bietet eine Übersicht über die Anzahl der Antworten und die Antwortgenauigkeit in bestimmten Zeitintervallen.</p>
          {Object.keys(statisticsData).length > 0 && Object.keys(accuracyData).length > 0 ? (
            <BarChart data1={statisticsData} data2={accuracyData}/>
          ) : (
            <p>Es liegen noch keine Informationen vor.</p>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default StudentStatisticsPage;

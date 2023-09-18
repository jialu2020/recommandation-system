import React, { useEffect, useState } from 'react';
import BarChart from "./StatisticsChart";
import Navbar from "../Navbar";
import Footer from "../footer";

const StudentStatisticsPage = () => {
  const [statisticsData, setStatisticsData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/statistics/admin')
      .then((response) => response.json())
      .then((data) => {
        console.log('API data:', data);

        if (Object.keys(data).length > 0) {
          console.log('StatisticsData1:', data);
          setStatisticsData(data);
        } else {
          console.error('API data is empty.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (



        <div>
      <Navbar />
      <div className="user-rankings-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
            <div>
      <h1>Leistung</h1>
       <BarChart data={statisticsData} />
    </div>


      </div>
      <Footer />
    </div>


  );
};

export default StudentStatisticsPage;

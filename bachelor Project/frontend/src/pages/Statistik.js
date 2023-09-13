import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js'; // 只导入 Chart 类
import Navbar from "../Navbar";

function StudentStatisticsPage() {

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <h1>学生每小时平均做题数量</h1>
        <div>
          <canvas id="barChart" width={400} height={200}></canvas>
        </div>
      </div>
    </div>
  );
}

export default StudentStatisticsPage;

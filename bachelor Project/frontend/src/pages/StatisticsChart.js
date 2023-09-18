import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (data && Object.keys(data).length > 0 && !chartInstance) {
      const chart = echarts.init(document.getElementById('bar-chart'));

      const option = {
        xAxis: {
          type: 'category',
          data: Object.keys(data),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: Object.values(data),
            type: 'bar',
          },
        ],
      };

      chart.setOption(option);
      setChartInstance(chart);
    }
  }, [data, chartInstance]);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default BarChart;

import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ data1, data2 }) => {
  useEffect(() => {
    let chart;

    if (data1 && Object.keys(data1).length > 0 && data2 && Object.keys(data2).length > 0) {
      // 销毁旧的图表实例
      if (chart) {
        chart.dispose();
      }

      chart = echarts.init(document.getElementById('bar-chart'));

      const xAxisData = Object.keys(data1);
      const seriesData1 = Object.values(data1);
      const seriesData2 = Object.values(data2);

      const option = {
        tooltip: {
          trigger: 'axis', // 启用柱子点击显示数值
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'richtige Antwort',
            data: seriesData1,
            type: 'bar',
            stack: 'stacked',
            itemStyle: {
              color: 'rgba(89,162,93,0.93)',
            },
          },
          {
            name: 'falsche Antwort',
            data: seriesData2,
            type: 'bar',
            stack: 'stacked',
            itemStyle: {
              color: 'rgba(183,83,76,0.84)',
            },
          },
        ],
      };

      chart.setOption(option);
    }

    // 在组件卸载时销毁图表实例
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [data1, data2]);

  return <div id="bar-chart" style={{ width: '500px', height: '400px' }}></div>;
};

export default BarChart;

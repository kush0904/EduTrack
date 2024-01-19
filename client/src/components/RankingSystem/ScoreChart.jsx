import React from 'react';
import { Bar } from 'react-chartjs-2';

const ScoreChart = ({ rankings }) => {
    const labels = rankings.map(student => student.Name);
    const getRandomColor = () => {
      const colors = ['rgb(63, 5, 68, 0.8)', 'rgba(191, 14, 14, 0.8)', 'rgba(255, 255, 0, 0.8)', 'rgba(0, 128, 0, 0.8)'];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };
    
    const datasets = [
      {
        label: 'Percentage',
        data: rankings.map(student => student.percentage),
        backgroundColor: getRandomColor(),
        borderWidth: 1,
      }
    ];
    const chartData = {
      labels: labels,
      datasets: datasets,
    };
  
    return (
      <div className="mb-4">
        <h2 className="text-center mb-3">Score Distribution</h2>
        <Bar data={chartData} />
      </div>
    );
  };
  
  export default ScoreChart;
  

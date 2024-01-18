import React from 'react';
import { Bar } from 'react-chartjs-2';

const ScoreChart = ({ rankings }) => {
    const labels = rankings.map(student => student.Name);
  
    const datasets = [
      {
        label: 'Percentage',
        data: rankings.map(student => student.percentage),
        backgroundColor:'rgba(191, 14, 14, 0.8)',
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
  

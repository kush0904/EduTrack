import React from 'react';
import { Bar } from 'react-chartjs-2';

const ScoreChart = ({ rankings }) => {
    const labels = rankings.map(student => student.studentName);
  
    const datasets = [
      {
        label: 'Score',
        data: rankings.map(student => student.score),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Attendance',
        data: rankings.map(student => student.attendance),
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
      {
        label: 'Behavior',
        data: rankings.map(student => student.behavior),
        backgroundColor: 'rgba(54,162,235,0.6)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
      },
      {
        label: 'Homework',
        data: rankings.map(student => student.homework),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
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
  

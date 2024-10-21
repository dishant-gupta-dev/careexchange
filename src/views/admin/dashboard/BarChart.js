import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto';

const data = {
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
  datasets: [
    {
      label: 'CHN',
      data: [20, 40, 15, 35, 25, 50, 30, 20],
      backgroundColor: 'rgba(218, 140, 255, 1)',
      borderColor: 'rgba(218, 140, 255, 1)',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      pointRadius: 0,
      fill: 'origin',
    },
    {
      label: 'USA',
      data: [40, 30, 20, 10, 50, 15, 35, 40],
      backgroundColor: 'rgba(255, 191, 150, 1)',
      borderColor: 'rgba(255, 191, 150, 1)',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      pointRadius: 0,
      fill: 'origin',
    },
    {
      label: 'UK',
      data: [70, 10, 30, 40, 25, 50, 15, 30],
      backgroundColor: 'rgba(54, 215, 232, 1)',
      borderColor: 'rgba(54, 215, 232, 1)',
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      pointRadius: 0,
      fill: 'origin',
    },
  ],
};

const BarChart = () => {
  return (
    <>
      <Bar data={data} />
    </>
  )
}

export default BarChart
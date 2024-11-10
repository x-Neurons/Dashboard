import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,

} from 'chart.js';


// Registering components and scales
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,

);

const ChartComponent = ({ products }) => {
  console.log("from charts", products);

  const labels = products.map((product)=>{
    const title = product.title;
    return title.split(' ')[0]; // Get the first word
  })
  const data = products.map((product)=>product.rating.rate)

  const chartData = {
    labels: labels,
    datasets: [{
      label: 'Product Ratings',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    // Find the index of the data point
                    const index = context.dataIndex;
                    // Get the full title from the products array
                    const fullTitle = products[index].title;
                    // Return the full title along with the rating
                    return `${fullTitle}: Rating=${products[index].rating.rate} `;
                },
            },
        },
    },
};
  return (
    <div className='border border-red-0 mt-36 mx-auto  md:w-3/4 sm: w-full'>
      <div className="chart-container ">
        <Bar data={chartData} options={options} />
      </div>
    </div>

  );
};

export default ChartComponent;

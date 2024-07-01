
import React from 'react';
import { Line } from 'react-chartjs-2';
import { registerables } from 'chart.js';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

const FinanceGraph = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Net worth',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: data.map(item => item.total),
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month',
                    tooltipFormat: 'MMM yyyy',
                    displayFormats: {
                        month: 'MMM yyyy',
                    },
                },
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Net worth',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '500px', width: '1000px', margin: '30px' }}>
            Finance Graph
            <Line data={chartData} options={options} />
        </div >
    )
}

export default FinanceGraph;

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
            {
                label: 'Binck fundcoach',
                backgroundColor: 'rgba(75, 25, 192, 0.2)',
                borderColor: 'rgba(75, 25, 192, 1)',
                data: data.map(item => item['account Binck Fundscoach'] + item['account Binck zelf beleggen']),
            },
            {
                label: 'TradersOnly',
                backgroundColor: 'rgba(175, 25, 192, 0.2)',
                borderColor: 'rgba(175, 25, 192, 1)',
                data: data.map(item => item['account TradersOnly']),
            },
            {
                label: 'Leaseplan',
                backgroundColor: 'rgba(175, 192, 25, 0.2)',
                borderColor: 'rgba(175, 192, 25, 1)',
                data: data.map(item => item['account LeaseplanBank']),
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
                ticks: {
                    maxTicksLimit: chartData.labels.length > 12 ? 12 : chartData.labels.length, // Adjust the number of ticks based on data points
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
            <Line data={chartData} options={options} />
        </div >
    )
}

export default FinanceGraph;
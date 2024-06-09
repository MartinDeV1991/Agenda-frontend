
import React, { useState, useEffect } from 'react';

import './weeklypage.css'
import WeeklyView from "../Components/Calendar/WeeklyView";

const WeeklyPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/mongodb/all-items');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Weekly Agenda</h1>
            <WeeklyView data={data} />
        </div>
    )
}

export default WeeklyPage;
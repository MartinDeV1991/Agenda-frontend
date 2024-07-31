
import React, { useState, useEffect } from 'react';

import './weeklypage.css'
import WeeklyView from "./WeeklyView";

const WeeklyPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('agenda_token');
            try {
                const response = await fetch('http://localhost:5000/mongodb/all-items', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
                );
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

import React, { useState, useEffect } from 'react';

import './weeklypage.css'
import WeeklyView from "./WeeklyView";
import { fetchAPI } from '../../Util/agendaAPI';

const WeeklyPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAPI(setData);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Weekly Agenda</h1>
            <WeeklyView data={data} />
        </div>
    )
}

export default WeeklyPage;
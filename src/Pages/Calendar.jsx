
import React, { useState, useEffect } from 'react';

// import CalendarCards from "../Components/Calendar/CalendarCards";
import MonthlyView from "../Components/Calendar/MonthlyView";
import RecurringTasks from "../Components/AddTasks/RecurringTasks";
import './calendar.css'

const Calendar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching data...");
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
            <h1>Montly Agenda</h1>
            <MonthlyView data={data} setData={setData} />
            <RecurringTasks />
        </div>
    )
}

export default Calendar;

import React, { useState, useEffect } from 'react';

// import CalendarCards from "../Components/Calendar/CalendarCards";
import MonthlyView from "../Components/Calendar/MonthlyView";
import './calendar.css'

const Calendar = () => {
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
            <h1>Montly Agenda</h1>
            {/* <CalendarCards data={dummyData} /> */}
            <MonthlyView
                data={data}
                setData={setData}
            />
        </div>
    )
}

export default Calendar;
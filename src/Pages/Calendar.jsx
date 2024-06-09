
import React, { useState, useEffect } from 'react';

// import CalendarCards from "../Components/Calendar/CalendarCards";
import MonthlyView from "../Components/Calendar/MonthlyView";
import './calendar.css'

const Calendar = () => {
    const [data, setData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isTimeFocused, setIsTimeFocused] = useState(false);

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
            <div>isNameFocused: {`${isNameFocused}`}</div>
            <div>isTimeFocused: {`${isTimeFocused}`}</div>
            <div>{editingTask === null ? 'false' : 'true'}</div>
            <h1>Montly Agenda</h1>

            {/* <CalendarCards data={dummyData} /> */}

            <MonthlyView data={data}
                setData={setData}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
                isNameFocused={isNameFocused}
                setIsNameFocused={setIsNameFocused}
                isTimeFocused={isTimeFocused}
                setIsTimeFocused={setIsTimeFocused}
            />
        </div>
    )
}

export default Calendar;
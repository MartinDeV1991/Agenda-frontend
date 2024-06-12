
import React, { useState, useEffect } from 'react';

import MonthlyView from "../Components/Calendar/MonthlyView";
import AddRecurringTasks from "../Components/RecurringTasks/AddRecurringTasks";
import ShiftRecurringTasks from '../Components/RecurringTasks/ShiftRecurringTasks';
import RemoveRecurringTasks from '../Components/RecurringTasks/RemoveRecurringTasks';
import './calendar.css'
import { fetchAPI } from '../Util/fetch';

const Calendar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchAPI(setData);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Montly Agenda</h1>
            <MonthlyView data={data} setData={setData} />
            <AddRecurringTasks setData={setData} />
            <ShiftRecurringTasks data={data} setData={setData} />
            <RemoveRecurringTasks data={data} setData={setData} />
        </div>
    )
}

export default Calendar;
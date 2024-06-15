
import React, { useState, useEffect } from 'react';

import MonthlyView from "../Components/Calendar/MonthlyView";
import AddRecurringTasks from "../Components/RecurringTasks/AddRecurringTasks";
import ShiftRecurringTasks from '../Components/RecurringTasks/ShiftRecurringTasks';
import RemoveRecurringTasks from '../Components/RecurringTasks/RemoveRecurringTasks';
import FindTasks from '../Components/Calendar/FindTasks';
import './calendar.css'
import { fetchAPI } from '../Util/fetch';

const Calendar = () => {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        fetchAPI(setData);
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Montly Agenda</h1>
            <MonthlyView data={data} setData={setData} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <AddRecurringTasks setData={setData} />
            <ShiftRecurringTasks data={data} setData={setData} />
            <RemoveRecurringTasks data={data} setData={setData} />
            <FindTasks data={data} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} />
        </div>
    )
}

export default Calendar;
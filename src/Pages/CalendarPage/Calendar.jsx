
import React, { useState, useEffect } from 'react';

import MonthlyView from "../CalendarPage/MonthlyView";
import AddRecurringTasks from "../../Components/RecurringTasks/AddRecurringTasks";
import ShiftRecurringTasks from '../../Components/RecurringTasks/ShiftRecurringTasks';
import RemoveRecurringTasks from '../../Components/RecurringTasks/RemoveRecurringTasks';
import FindTasks from '../CalendarPage/FindTasks';
import CategoryLegend from '../CalendarPage/CategoryLegend';

import './calendar.css'
import { fetchAPI } from '../../Util/agendaAPI';

const Calendar = () => {
    const [data, setData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [showTime, setShowTime] = useState(true);

    useEffect(() => {
        fetchAPI(setData);
    }, []);

    const colorCodes = {
        'Personal': 'rgb(0,0,255,0.5)',
        'Work': 'rgb(255,0,0,0.5)',
        'Sports': 'rgb(0,255,0,0.5)',
        'Social': 'rgb(255,255,0,0.5)',
        'Full day events': 'rgb(0,255,255,0.5)',
        'None': '#F0F0F0',
    };

    return (
        <div className='calendar-page-container'>
            <div className='calendar-legend-container'>
                <div>
                    <button className={`${showTime ? 'show-time-button' : 'hide-time-button'}`} onClick={() => setShowTime(!showTime)}>{showTime ? 'Showing time' : 'Hiding time'}</button>
                    <CategoryLegend colorCodes={colorCodes} />
                </div>
                <MonthlyView data={data} setData={setData} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear} colorCodes={colorCodes} showTime={showTime} />
            </div>
            <AddRecurringTasks setData={setData} />
            <ShiftRecurringTasks data={data} setData={setData} />
            <RemoveRecurringTasks data={data} setData={setData} />
            <FindTasks data={data} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} />
        </div>
    )
}

export default Calendar;
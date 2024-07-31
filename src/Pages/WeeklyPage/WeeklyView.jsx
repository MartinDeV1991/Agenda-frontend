import React, { useState } from "react";

const WeeklyView = ({ data }) => {
    const [selectedWeek, setSelectedWeek] = useState(getWeekNumber()); // Assuming we start from week 1
    const weeksInYear = 52; // Assuming 52 weeks in a year
    const year = 2024; // Assuming a specific year for now
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    function getWeekNumber() {
        let currentDate = new Date();
        let startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        let dayOfYear = ((currentDate - startOfYear + (24 * 60 * 60 * 1000)) / 86400000);
        return Math.floor((dayOfYear + startOfYear.getDay() + 1) / 7) - 1;
    }

    const handleWeekChange = (week) => {
        setSelectedWeek(week);
    };

    const getWeekDates = (year, weekNumber) => {
        const firstDayOfYear = new Date(year, 0, 1);
        const firstMondayOfYear = new Date(firstDayOfYear.getTime() + (8 - firstDayOfYear.getDay()) * 24 * 60 * 60 * 1000);
        const firstDayOfSelectedWeek = new Date(firstMondayOfYear.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            weekDates.push(new Date(firstDayOfSelectedWeek.getTime() + i * 24 * 60 * 60 * 1000));
        }
        return weekDates;
    };

    const weekOptions = Array.from({ length: weeksInYear }, (_, index) => {
        const weekStartDate = getWeekDates(year, index + 1)[0]; // Get the start date of the week
        const weekNumber = index + 1; // Week numbers start from 1
        // console.log(weekStartDate)
        return { weekNumber, weekStartDate };
    });

    const weekDates = getWeekDates(year, selectedWeek);

    const findTasksForDay = (date) => {
        return data.filter(task => task.date === date.toLocaleDateString('en-CA'));
    };

    return (
        <div className="weekly-calendar">
            <div className="week-selector">
                <select value={selectedWeek} onChange={(e) => handleWeekChange(parseInt(e.target.value))}>
                    {weekOptions.map(({ weekNumber, weekStartDate }) => (
                        <option key={weekNumber} value={weekNumber}>
                            Week {weekNumber} ({weekStartDate.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})
                        </option>
                    ))}
                </select>
            </div>
            <div className="week-days">
                {weekDays.map((day, index) => (
                    <div key={index} className="day-card">
                        <h3>{day}</h3>
                        {weekDates[index] && (
                            <div>
                                {findTasksForDay(weekDates[index]).map((task, index) => (
                                    <div key={index} className="task">
                                        <div className="task-name">{task.name}</div>
                                        <div className="task-time">{task.time}</div>
                                        <div className="task-description">{task.shortDescription}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyView;

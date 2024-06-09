import React from 'react';

// Helper function to group data by week
const generateYearDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

// Main component
const chunkDatesIntoWeeks = (dates) => {
    const weeks = [];
    let currentWeek = Array(7).fill(null); // Initialize with null for empty slots
    let lastMonth = dates[0].getMonth();

    dates.forEach(date => {
        const dayOfWeek = (date.getDay() + 6) % 7; // Adjust index to start with Monday
        const currentMonth = date.getMonth();

        // If month changes, push current week to weeks array and reset it
        if (currentMonth !== lastMonth) {
            // Fill the rest of the current week with null
            for (let i = dayOfWeek; i < 7; i++) {
                currentWeek[i] = null;
            }
            weeks.push(currentWeek);
            weeks.push('new-month'); // Indicator for new month
            currentWeek = new Array(7).fill(null); // Reset current week
            lastMonth = currentMonth;
        }

        currentWeek[dayOfWeek] = date;

        if (dayOfWeek === 6) {
            weeks.push(currentWeek);
            currentWeek = new Array(7).fill(null);
        }
    });

    // Push the last week if it's not complete
    if (currentWeek.some(date => date !== null)) {
        weeks.push(currentWeek);
    }

    return weeks;
};



const CalendarCards = ({ data }) => {

    const findTasksForDate = (date) => {
        if (data.filter(task => task.date === date.toLocaleDateString('en-CA')).length > 0) {
            console.log("On date: ", date, ":", data.filter(task => task.date === date.toLocaleDateString('en-CA')))
        }
        return data.filter(task => task.date === date.toLocaleDateString('en-CA'));
    };

    let dates = generateYearDates(new Date(2024, 0, 1), new Date(2024, 11, 31));
    const weeks = chunkDatesIntoWeeks(dates);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="calendar-container">
            {weeks.map((week, weekIndex) =>
                week === 'new-month' ? (
                    <div key={weekIndex} className="new-month-line"></div>
                ) : (
                    <div key={weekIndex} className="week-row">
                        {week.map((date, dayIndex) => (
                            <div key={dayIndex} className="day-card">
                                {date && (
                                    <>
                                        <div>{date.toLocaleDateString()}</div>
                                        <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                        <div className="tasks">
                                            {findTasksForDate(date).map((task, index) => (
                                                <div key={index}>{task.name}</div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default CalendarCards;

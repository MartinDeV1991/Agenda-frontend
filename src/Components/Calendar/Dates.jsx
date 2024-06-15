
import { useEffect, useState } from "react";
const generateMonthDates = (year, month) => {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

    for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(year, month, day));
    }

    return { dates, adjustedFirstDay };
};

const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date();
    date.setMonth(index);
    return { value: index, label: date.toLocaleDateString('en-CA', { month: 'long' }) };
});
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 200 }, (_, index) => index + currentYear - 100);


const Dates = ({ setFirstDay, setDates, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear }) => {

    const { dates, adjustedFirstDay } = generateMonthDates(selectedYear, selectedMonth);
    const monthName = dates[0].toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value, 10);
        setSelectedMonth(selectedMonth);
    };

    const handleYearChange = (event) => {
        const selectedYear = parseInt(event.target.value, 10);
        setSelectedYear(selectedYear);
    };

    const goToCurrent = () => {
        setSelectedMonth(new Date().getMonth());
        setSelectedYear(new Date().getFullYear());
    }
    useEffect(() => {
        setDates(dates);
        setFirstDay(adjustedFirstDay);
    }, [selectedMonth, selectedYear]);

    const leftArrow = '<';
    const rightArrow = '>';

    return (
        <div>
            <select className="year-select-monthview" onChange={handleYearChange} value={selectedYear} >
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>

            <select className="month-select-monthview" onChange={handleMonthChange} value={selectedMonth} >
                {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                ))}
            </select>
            <button onClick={goToCurrent}>Go to current year/month</button>
            <div className="month-name-container-monthview">
                <button className="arrow" onClick={() => setSelectedMonth(selectedMonth - 1)}>{leftArrow} </button>
                <div className="month-name-monthview">{monthName}</div>
                <button className="arrow" onClick={() => setSelectedMonth(selectedMonth + 1)}>{rightArrow} </button>
            </div>
        </div>
    )

}

export default Dates;
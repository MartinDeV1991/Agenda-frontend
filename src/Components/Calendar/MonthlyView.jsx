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

const MonthlyView = ({ data, setData, editingTask, setEditingTask, isNameFocused, setIsNameFocused, isTimeFocused, setIsTimeFocused }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [editingName, setEditingName] = useState('');
    const [editingTime, setEditingTime] = useState('');

    const months = Array.from({ length: 12 }, (_, index) => {
        const date = new Date();
        date.setMonth(index);
        return { value: index, label: date.toLocaleDateString('en-CA', { month: 'long' }) };
    });

    const handleMonthChange = (event) => {
        const selectedMonth = parseInt(event.target.value, 10);
        setSelectedMonth(selectedMonth);
    };

    const findTasksForDate = (date) => {
        return data.filter(task => task.date === date.toLocaleDateString('en-CA'));
    };

    const year = 2024; // Assuming a specific year for now
    const { dates, adjustedFirstDay } = generateMonthDates(year, selectedMonth);
    const monthName = dates[0].toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

    const startEditing = (task) => {
        setEditingTask(task);
        setEditingName(task.name);
        setEditingTime(task.time);
    };

    const handleNameChange = (event) => {
        setEditingName(event.target.value);
    };

    const handleTimeChange = (event) => {
        setEditingTime(event.target.value);
    };

    const handleInputBlur = () => {
        if (editingTask) {
            const updatedTasks = data.map(task =>
                task === editingTask ? { ...task, name: editingName, time: editingTime } : task
            );
            setData(updatedTasks);
            if (!isNameFocused && !isTimeFocused) {
                setEditingTask(null);
                console.log('Task updated successfully');
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleInputBlur();
        }
    };

    return (
        <div className="calendar-container-monthview">
            <select className="month-select-monthview" onChange={handleMonthChange}>
                {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                ))}
            </select>
            <h2 className="month-name-monthview">{monthName}</h2>
            <div className="week-row-monthview">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="day-label-monthview">{day}</div>
                ))}
            </div>
            <div className="calendar-grid-monthview">
                {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="day-card-monthview empty"></div>
                ))}
                {dates.map((date, index) => (
                    <div key={index} className="day-card-monthview">
                        <div className="day-number-monthview">{date.getDate()}</div>
                        <div className="tasks-monthview">
                            {findTasksForDate(date).map((task, index) => (
                                <div
                                    key={index}
                                    className="task-monthview"
                                    onClick={() => startEditing(task)}
                                >
                                    {editingTask === task ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={handleNameChange}
                                                onKeyDown={handleKeyDown}
                                                onFocus={() => setIsNameFocused(true)}
                                                onBlur={() => {
                                                    handleInputBlur();
                                                }}
                                                autoFocus
                                            />
                                            <input
                                                type="text"
                                                value={editingTime}
                                                onChange={handleTimeChange}
                                                onKeyDown={handleKeyDown}
                                                onFocus={() => setIsTimeFocused(true)}
                                                onBlur={() => {
                                                    handleInputBlur();
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        `${task.name} ${task.time ? `(${task.time})` : ''}`
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyView;

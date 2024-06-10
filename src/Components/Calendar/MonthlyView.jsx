import { useEffect, useState } from "react";
import { ObjectId } from "bson";

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

const MonthlyView = ({ data, setData }) => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [editingName, setEditingName] = useState('');
    const [editingTime, setEditingTime] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [newEditingTask, setNewEditingTask] = useState(null);

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

    const year = 2024;
    const { dates, adjustedFirstDay } = generateMonthDates(year, selectedMonth);
    const monthName = dates[0].toLocaleDateString('en-CA', { month: 'long', year: 'numeric' });

    const startEditing = (task) => {
        setEditingTask(task);
        setEditingName(task.name);
        setEditingTime(task.time);
        setNewEditingTask(null);
    };

    const createNewTaskAndEdit = (date) => {
        setEditingTask(null);
        let task = {
            _id: new ObjectId().toString(),
            name: '',
            time: '',
            date: date.toLocaleDateString('en-CA')
        }
        startEditing(task);
        setNewEditingTask(task);
    };

    const handleNameChange = (event) => {
        setEditingName(event.target.value);
    };

    const handleTimeChange = (event) => {
        setEditingTime(event.target.value);
    };

    const UpdateTask = () => {
        if (editingTask) {
            const updatedTasks = data.map(task =>
                task === editingTask ? { ...task, name: editingName, time: editingTime } : task
            );
            setData(updatedTasks);
            data.forEach(task => task === editingTask ? uploadTask() : null);
        }
        console.log("updating")
    };

    const uploadTask = () => {
        const id = editingTask._id;
        const task = { ...editingTask, name: editingName, time: editingTime }
        if (task.name !== '') {
            fetch(`http://localhost:5000/mongodb/item/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Updated document:', data);
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        }
    }

    const UpdateTask1 = () => {
        const task = { ...newEditingTask, name: editingName, time: editingTime }
        if (task && task.name !== '') {
            setData((prevData) => [...prevData, task]);
            uploadTask1(task);
        }
        console.log("updating")
    };

    const uploadTask1 = (task) => {
        console.log(task)
        if (task.name !== '') {
            fetch(`http://localhost:5000/mongodb/item/${task._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Updated document:', data);
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
        }
    }
    const handleKeyDown1 = (event) => {
        if (event.key === 'Enter') {
            UpdateTask1();
            setEditingTask(null);
            setNewEditingTask(null);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            UpdateTask();
            setEditingTask(null);
            setNewEditingTask(null);
        }
    };

    return (
        <div className="calendar-container-monthview">
            <select className="month-select-monthview" onChange={handleMonthChange} value={selectedMonth} >
                {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                ))}
            </select>

            <h2 className="month-name-monthview">{monthName}</h2>
            <div>{editingTask ? 'true' : 'false'}</div>
            {editingTask && <div>{editingTask._id}</div>}
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
                    <div key={index} className="day-card-monthview"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                createNewTaskAndEdit(date);
                            }
                        }}
                    >
                        <div className="day-number-monthview">{date.getDate()}</div>
                        <div className="tasks-monthview">
                            {newEditingTask && parseInt(newEditingTask.date.split('-')[2], 10) === date.getDate() && <div><input
                                type="text"
                                value={editingName}
                                onChange={handleNameChange}
                                onKeyDown={handleKeyDown1}
                                placeholder="Task Name"
                                autoFocus
                            />
                                <input
                                    type="text"
                                    value={editingTime}
                                    onChange={handleTimeChange}
                                    onKeyDown={handleKeyDown1}
                                    placeholder="Time"
                                /></div>}
                            {findTasksForDate(date).map((task, index) => (
                                <div
                                    key={index}
                                    className="task-monthview"
                                    onClick={() => startEditing(task)}
                                >
                                    {!newEditingTask && editingTask && task && editingTask._id === task._id
                                        ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editingName}
                                                    onChange={handleNameChange}
                                                    onKeyDown={handleKeyDown}
                                                    autoFocus
                                                />
                                                <input
                                                    type="text"
                                                    value={editingTime}
                                                    onChange={handleTimeChange}
                                                    onKeyDown={handleKeyDown}
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

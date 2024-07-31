import { useState } from "react";
import TaskInputs from "../CalendarPage/TaskInputs";
import Dates from "../CalendarPage/Dates";
import { postAPI, removeAPI } from "../../Util/agendaAPI";

const WeekRow = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (
        <div className="week-row-monthview">
            {days.map(day => (
                <div key={day} className="day-label-monthview">{day}</div>
            ))}
        </div>
    )
};

const EmptyDays = ({ count }) => (
    Array.from({ length: count }).map((_, index) => (
        <div key={`empty-${index}`} className="day-card-monthview empty"></div>
    ))
);

const MonthlyView = ({ data, setData, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, colorCodes, showTime }) => {

    const [dates, setDates] = useState([]);
    const [firstDay, setFirstDay] = useState(0);

    const [editingTask, setEditingTask] = useState(null);
    const [newEditingTask, setNewEditingTask] = useState(null);

    const [draggedTask, setDraggedTask] = useState(null);

    const findTasksForDate = (date) => {
        return data.filter(task => task.date === date.toLocaleDateString('en-CA'));
    };

    const startEditing = (task) => {
        setEditingTask(task);
        setNewEditingTask(null);
    };

    const createNewTaskAndEdit = (date) => {
        setEditingTask(null);
        let task = {
            name: '',
            time: '',
            date: date.toLocaleDateString('en-CA')
        }
        startEditing(task);
        setNewEditingTask(task);
    };

    const uploadTask = (task) => {
        if (task.name === '') {
            alert("Please enter a task name");
            return;
        }
        postAPI(task, setData);
    }

    const handleRemoveTask = (task) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            removeAPI(task, setData);
        }
    };

    const updateTask = () => {
        if (editingTask && editingTask.name !== '') {
            uploadTask(editingTask);
        }
        console.log("Updating task")
    };

    const addTask = () => {
        if (newEditingTask && newEditingTask.name !== '') {
            uploadTask(newEditingTask);
            console.log("Adding task")
        }
    };
    const handleKeyDown1 = (event) => {
        if (event.key === 'Enter') {
            addTask();
            setEditingTask(null);
            setNewEditingTask(null);
        } else if (event.key === 'Escape') {
            setEditingTask(null);
            setNewEditingTask(null);
            console.log("Escape")
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            updateTask();
            setEditingTask(null);
            setNewEditingTask(null);
        } else if (event.key === 'Escape') {
            setEditingTask(null);
            setNewEditingTask(null);
        }
    };

    const handleDrop = (date) => {
        if (!draggedTask || !draggedTask.label || draggedTask.label === '' || draggedTask.label === undefined || draggedTask.label === null) {
            const task = { ...draggedTask, date: date.toLocaleDateString('en-CA') }
            uploadTask(task);
            setDraggedTask(null);
        } else {
            if (window.confirm("Do you want to move all tasks with the same label?")) {
                const dayOfWeekForInputDate = date.getDay();
                const dayOfWeekForDraggedTaskDate = new Date(draggedTask.date).getDay();
                const shiftBy = dayOfWeekForInputDate - dayOfWeekForDraggedTaskDate;

                data.forEach(task => {
                    if (task.label === draggedTask.label) {
                        const newDate = new Date(task.date);
                        newDate.setDate(newDate.getDate() + shiftBy);
                        uploadTask({ ...task, date: newDate.toLocaleDateString('en-CA') });
                    }
                });
                setDraggedTask(null);
            }
            else {
                if (window.confirm("Do you want to remove the label from this task?")) {
                    const task = { ...draggedTask, date: date.toLocaleDateString('en-CA'), label: '' }
                    uploadTask(task);
                    setDraggedTask(null);
                }
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setEditingTask(null);
        setNewEditingTask(null);
    };

    return (
        <div className="calendar-container-monthview">
            <Dates setDates={setDates} setFirstDay={setFirstDay} selectedMonth={selectedMonth} selectedYear={selectedYear} setSelectedMonth={setSelectedMonth} setSelectedYear={setSelectedYear} />
            <WeekRow />

            <div className="calendar-grid-monthview">
                <EmptyDays count={firstDay} />
                {dates.map((date, index) => (
                    <div key={index} className={`day-card-monthview ${date.toLocaleDateString('en-CA') === new Date().toLocaleDateString('en-CA') ? 'today-card-monthview' : ''}`}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                createNewTaskAndEdit(date);
                            }
                        }}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(date)}

                    >
                        <div className="day-number-monthview">{date.getDate()}</div>
                        <div className="tasks-monthview">
                            {findTasksForDate(date).map((task, index) => (
                                <div
                                    key={index}
                                    className="task-monthview"
                                    onClick={() => {
                                        startEditing(task)
                                    }}
                                    style={{ position: 'relative', color: 'black', backgroundColor: colorCodes[task.category] }}
                                    draggable
                                    onDragStart={() => setDraggedTask(task)}
                                >

                                    {!newEditingTask &&
                                        editingTask &&
                                        task &&
                                        editingTask._id === task._id
                                        ? (
                                            <TaskInputs
                                                editingTask={editingTask}
                                                setEditingTask={setEditingTask}
                                                handleKeyDown={handleKeyDown}
                                                colorCodes={colorCodes}
                                            />
                                        ) : (
                                            <>
                                                {`${task.name} ${showTime && task.time ? `(${task.time})` : ''}`}
                                                <button
                                                    onClick={() => handleRemoveTask(task)}
                                                    className="remove-button"
                                                    style={{ fontSize: '10px', padding: '0px', position: 'absolute', top: '0px', right: '0px' }}
                                                >
                                                    x
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            ))}
                            {newEditingTask &&
                                parseInt(newEditingTask.date.split('-')[2], 10) === date.getDate() &&
                                <TaskInputs
                                    editingTask={newEditingTask}
                                    setEditingTask={setNewEditingTask}
                                    handleKeyDown={handleKeyDown1}
                                    colorCodes={colorCodes}
                                />
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyView;

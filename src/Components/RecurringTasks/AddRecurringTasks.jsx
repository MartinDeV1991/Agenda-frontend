
import { useState } from "react";
import { ObjectId } from "bson";
import { postAPI } from "../../Util/fetch";

const AddRecurringTasks = ({ setData }) => {

    const [selectedDay, setSelectedDay] = useState("Sunday");
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString('en-CA'));
    const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));

    const [task, setTask] = useState({
        name: '',
        time: '',
        label: '',
        category: ''
    });

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleTaskChange = (event) => {
        const { name, value } = event.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const uploadTasks = () => {
        if (startDate === '' || endDate === '' || task.name === '') {
            alert("Please fill in all required fields");
            return;
        }
        const tasks = [];
        const currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            if (selectedDay === currentDate.toLocaleDateString('en-CA', { weekday: 'long' })) {
                const newTask = {
                    ...task,
                    _id: new ObjectId().toString(),
                    date: currentDate.toLocaleDateString('en-CA')
                };
                tasks.push(newTask);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        tasks.forEach(task => {
            postAPI(task, setData);
        });
    }

    return (
        <div>
            <h1>Recurring Tasks</h1>

            <select className="" onChange={handleDayChange} value={selectedDay} >
                {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <div>
                    <label>
                        Start Date:
                        <input type="date" onChange={handleStartDateChange} value={startDate} />
                    </label>
                    <br />

                    <label>
                        End Date:
                        <input type="date" onChange={handleEndDateChange} value={endDate} />
                    </label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>
                        Task Name:
                        <input name="name" onChange={handleTaskChange} value={task.name} />
                    </label>
                    <label>
                        Task Time:
                        <input name="time" onChange={handleTaskChange} value={task.time} />
                    </label>
                    <label>
                        Task Label:
                        <input name="label" onChange={handleTaskChange} value={task.label} />
                    </label>
                    <label>
                        Task Category:
                        <input name="category" onChange={handleTaskChange} value={task.category} />
                    </label>
                    <button onClick={() => uploadTasks()}>Add Task</button>
                </div>
            </div>

        </div>
    );
}

export default AddRecurringTasks;

import { useState } from "react";
import { ObjectId } from "bson";
import { createTasks } from "../../Util/createTasks";
import { postAPI } from "../../Util/fetch";

const AddRecurringTasks = ({ setData }) => {

    const [selectedDay, setSelectedDay] = useState("Sunday");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [taskName, setTaskName] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskLabel, setTaskLabel] = useState('');

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const uploadTasks = () => {
        const tasks = [];

        if (startDate === '' || endDate === '' || taskName === '') {
            alert("Please fill in all the fields");
            return;
        }
        const currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            if (selectedDay === currentDate.toLocaleDateString('en-CA', { weekday: 'long' })) {
                const task = createTasks();
                task._id = new ObjectId().toString();
                task.name = taskName;
                task.time = taskTime;
                task.date = currentDate.toLocaleDateString('en-CA');
                task.label = taskLabel;

                tasks.push(task);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        tasks.forEach(task => {
            uploadTask(task);
        });
    }

    const uploadTask = (task) => {
        if (task.name !== '') {
            postAPI(task, setData);
        }
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
                        <input onChange={(event) => setTaskName(event.target.value)} />
                    </label>
                    <label>
                        Task Time:
                        <input onChange={(event) => setTaskTime(event.target.value)} />
                    </label>
                    <label>
                        Task Label:
                        <input onChange={(event) => setTaskLabel(event.target.value)} />
                    </label>
                    <button onClick={() => uploadTasks()}>Add Task</button>
                </div>
            </div>

        </div>
    );
}

export default AddRecurringTasks;
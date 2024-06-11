
import { useState } from "react";
import { ObjectId } from "bson";

const RecurringTasks = () => {

    const [selectedDay, setSelectedDay] = useState("Sunday");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [taskName, setTaskName] = useState('');
    const [taskTime, setTaskTime] = useState('');

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTaskTime(event.target.value);
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    console.log(new Date().toLocaleDateString('en-CA', { weekday: 'long' }))
    const uploadTasks = () => {
        const tasks = [];
        if (startDate !== '' && endDate !== '') {
            const currentDate = new Date(startDate);
            while (currentDate <= new Date(endDate)) {
                if (selectedDay === currentDate.toLocaleDateString('en-CA', { weekday: 'long' })) {
                    const task = {
                        _id: new ObjectId().toString(),
                        name: taskName,
                        time: taskTime,
                        date: currentDate.toLocaleDateString('en-CA')
                    }
                    tasks.push(task);
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
            console.log("Uploading ", tasks.length, " tasks");
            tasks.forEach(task => {
                console.log(task)
                uploadTask(task);
            });
        }
    }

    const uploadTask = (task) => {
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

    return (
        <div>
            <h1>Recurring Tasks</h1>

            <select className="" onChange={handleDayChange} value={selectedDay} >
                {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>

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
            <div>
                <label>
                    Task Name:
                    <input onChange={(event) => setTaskName(event.target.value)} />
                </label>
                <label>
                    Task Time:
                    <input onChange={(event) => setTaskTime(event.target.value)} />
                </label>
                <button onClick={() => uploadTasks()}>Add Task</button>
            </div>
        </div>
    )
}

export default RecurringTasks;
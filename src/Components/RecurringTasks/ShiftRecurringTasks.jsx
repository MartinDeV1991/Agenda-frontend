
import { postAPI } from "../../Util/agendaAPI";
import { useState } from "react";

const ShiftRecurringTasks = ({ data, setData }) => {

    const [shiftLabel, setShiftLabel] = useState(false);
    const [targetDay, setTargetDay] = useState(false);

    const shiftTasksByLabel = () => {
        const referenceTask = data.find(task => task.label === shiftLabel);
        if (!referenceTask) {
            console.error("No task found with the specified label.");
            return;
        }

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const targetDayIndex = daysOfWeek.indexOf(targetDay);
        const taskDate = new Date(referenceTask.date);
        const taskDayIndex = taskDate.getDay();
        const shiftBy = targetDayIndex - taskDayIndex;

        data.forEach(t => {
            if (t.label === shiftLabel) {
                const date = new Date(t.date);
                date.setDate(date.getDate() + shiftBy);
                t.date = date.toLocaleDateString('en-CA')
                postAPI(t, setData);
            }
        });
        return;
    };

    return (
        <div>
            <h1>Shift Tasks</h1>
            <input placeholder="Enter label" onChange={(event) => setShiftLabel(event.target.value)} />
            <input placeholder="Enter day" onChange={(event) => setTargetDay(event.target.value)} />
            <button onClick={() => shiftTasksByLabel()}>Change Task</button>
        </div>
    );
}

export default ShiftRecurringTasks;
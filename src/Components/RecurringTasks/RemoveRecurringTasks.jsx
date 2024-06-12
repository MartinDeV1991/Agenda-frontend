
import { removeAPI } from "../../Util/fetch";
import { useState } from "react";

const RemoveRecurrentTask = ({ data, setData }) => {

    const [removeLabel, setRemoveLabel] = useState(false);

    const removeRecurrentTask = () => {
        const tasksToRemove = data.filter(t => t.label === removeLabel);
        if (window.confirm("Are you sure you want to delete this task?")) {
            tasksToRemove.forEach(t => removeAPI(t, setData));
        }
    }

    return (
        <div>
            <h1>Remove Tasks</h1>
            <input placeholder="Enter label" onChange={(event) => setRemoveLabel(event.target.value)} />
            <button onClick={() => removeRecurrentTask()}>Remove Task</button>
        </div>
    )

}

export default RemoveRecurrentTask;
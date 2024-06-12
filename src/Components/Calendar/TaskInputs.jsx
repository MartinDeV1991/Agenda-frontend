import React from 'react';

const TaskInputs = ({
    editingName,
    editingTime,
    setEditingName,
    setEditingTime,
    handleKeyDown,
}) => {
    return (
        <div>
            <input
                type="text"
                value={editingName}
                onChange={(event) => setEditingName(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task Name"
                autoFocus
            />
            <input
                type="text"
                value={editingTime}
                onChange={(event) => setEditingTime(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Time"
            />
        </div>
    );
};

export default TaskInputs;

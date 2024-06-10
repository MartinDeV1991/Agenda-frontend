import React from 'react';

const TaskInputs = ({
    editingName,
    editingTime,
    handleNameChange,
    handleTimeChange,
    handleKeyDown,
}) => {
    return (
        <div>
            <input
                type="text"
                value={editingName}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                placeholder="Task Name"
                autoFocus
            />
            <input
                type="text"
                value={editingTime}
                onChange={handleTimeChange}
                onKeyDown={handleKeyDown}
                placeholder="Time"
            />
        </div>
    );
};

export default TaskInputs;

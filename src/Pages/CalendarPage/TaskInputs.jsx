import React from 'react';

const TaskInputs = ({
    editingTask,
    setEditingTask,
    handleKeyDown,
    colorCodes,
}) => {
    return (
        <div
            onClick={(event) => event.stopPropagation()}
            draggable="true"
            onDragStart={(event) => {
                event.stopPropagation();
                event.preventDefault();
            }}
        >
            <input
                type="text"
                value={editingTask.name}
                onChange={(event) => setEditingTask(prev => ({ ...prev, name: event.target.value }))}
                onKeyDown={handleKeyDown}
                placeholder="Task Name"
                autoFocus
            />
            <input
                type="text"
                value={editingTask.time}
                onChange={(event) => setEditingTask(prev => ({ ...prev, time: event.target.value }))}
                onKeyDown={handleKeyDown}
                placeholder="Time"
            />
            <select
                value={editingTask.category || 'None'}
                style={{ backgroundColor: editingTask.category ? colorCodes[editingTask.category] : colorCodes['None'], width: '100%' }}
                onChange={(event) => setEditingTask(prev => ({ ...prev, category: event.target.value }))}
                onKeyDown={handleKeyDown}
            >
                {colorCodes && Object.keys(colorCodes).map(category => (
                    <option key={category} value={category} style={{ backgroundColor: colorCodes[category] }}>
                        {category}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={editingTask.label}
                onChange={(event) => setEditingTask(prev => ({ ...prev, label: event.target.value }))}
                onKeyDown={handleKeyDown}
                placeholder="Label"
            />
        </div>
    );
};

export default TaskInputs;

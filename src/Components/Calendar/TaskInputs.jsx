import React from 'react';

const TaskInputs = ({
    editingName,
    editingTime,
    editingLabel,
    editingCategory,
    setEditingName,
    setEditingTime,
    setEditingLabel,
    setEditingCategory,
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
                value={editingName}
                onChange={(event) => setEditingName(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Task Name"
                autoFocus
                draggable="false"
            />
            <input
                type="text"
                value={editingTime}
                onChange={(event) => setEditingTime(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Time"
            />
            <select
                value={editingCategory || 'None'}
                style={{ backgroundColor: editingCategory ? colorCodes[editingCategory] : colorCodes['None'], width: '100%' }}
                onChange={(event) => setEditingCategory(event.target.value)}
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
                value={editingLabel}
                onChange={(event) => setEditingLabel(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Label"
            />
        </div >
    );
};

export default TaskInputs;

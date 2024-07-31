import React, { useState, useEffect } from 'react';
import './tasks.css';
import '@fortawesome/fontawesome-free/css/all.css';

const FindTasks = ({ data, setSelectedMonth, setSelectedYear }) => {
    const [taskName, setTaskName] = useState('');
    const [taskLabel, setTaskLabel] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [expandedSection, setExpandedSection] = useState(null);

    const labels = [...new Set(data.filter(task => task.label).map(task => task.label))];
    const categories = [...new Set(data.filter(task => task.category).map(task => task.category))];

    useEffect(() => {
        if (labels.length > 0 && !taskLabel) setTaskLabel(labels[0]);
        if (categories.length > 0 && !taskCategory) setTaskCategory(categories[0]);
    }, [labels, categories]);

    const findTasks = (key, value) => data.filter(task => task[key] === value);

    const handleScrollToTop = (taskDate) => {
        const [year, month] = taskDate.split('-');
        setSelectedMonth(parseInt(month) - 1);
        setSelectedYear(year);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderTaskList = (tasks) => (
        <div className="task-container">
            {tasks.map(task => (
                <div className="task-item" key={task._id}>
                    <div className="task-name">{task.name} {task.time && `(${task.time})`}</div>
                    <div className="task-date"><strong>{task.date}</strong></div>
                    {task.label && <div className="task-label"> Label: {task.label}</div>}
                    {task.category && <div className="task-category"> Category: {task.category}</div>}
                    <button className="scroll-button" onClick={() => handleScrollToTop(task.date)}>
                        Go to task
                    </button>
                </div>
            ))}
        </div>
    );

    const renderSection = (title, stateKey, options, value, setValue) => (
        <div className={`find-by-${stateKey}-container`}>
            <h2 onClick={() => setExpandedSection(expandedSection === stateKey ? null : stateKey)} style={{ cursor: 'pointer' }}>
                {title} <i className="fa-solid fa-chevron-down" style={{ fontSize: '20px' }}></i>
            </h2>
            {expandedSection === stateKey && (
                <div>
                    {stateKey === 'name' ? (
                        <input
                            type="text"
                            placeholder={`Search tasks by ${stateKey}`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    ) : (
                        <select value={value} onChange={(e) => setValue(e.target.value)}>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    )}
                    {renderTaskList(findTasks(stateKey, value))}
                </div>
            )}
        </div>
    );

    return (
        <div style={{ marginTop: '50px' }}>
            {renderSection('Find a task by name', 'name', null, taskName, setTaskName)}
            {renderSection('Find a task by label', 'label', labels, taskLabel, setTaskLabel)}
            {renderSection('Find a task by category', 'category', categories, taskCategory, setTaskCategory)}
        </div>
    );
};

export default FindTasks;
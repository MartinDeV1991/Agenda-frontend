import React, { useState, useEffect } from 'react';
import './tasks.css';
import '@fortawesome/fontawesome-free/css/all.css';

const FindTasks = ({ data, setSelectedMonth, setSelectedYear }) => {

    const labels = [...new Set(data.filter(task => task.hasOwnProperty('label') && task.label !== '' && task.label !== null).map(task => task.label))];
    const categories = [...new Set(data.filter(task => task.category !== '' && task.category !== null).map(task => task.category))];

    const [taskName, setTaskName] = useState('');
    const [taskLabel, setTaskLabel] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [expandNames, setExpandNames] = useState(false);
    const [expandLabels, setExpandLabels] = useState(false);
    const [expandCategories, setExpandCategories] = useState(false);

    function findTasksByName() {
        return data.filter(task => task.name === taskName);
    }

    function findTasksByLabel() {
        return data.filter(task => task.label === taskLabel);
    }

    function findTasksByCategory() {
        return data.filter(task => task.category === taskCategory);
    }

    const handleScrollToTop = (taskDate) => {
        const taskMonth = taskDate.substring(5, 7);
        const taskYear = taskDate.substring(0, 4);
        setSelectedMonth(taskMonth - 1);
        setSelectedYear(taskYear);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (labels.length > 0 && !taskLabel) {
            setTaskLabel(labels[0]);
        }
        if (categories.length > 0 && !taskCategory) {
            setTaskCategory(categories[0]);
        }
    }, [labels, categories]);

    return (
        <div style={{ marginTop: '50px' }}>
            <div className='find-by-name-container'>
                <h2 onClick={() => setExpandNames(!expandNames)} style={{ cursor: 'pointer' }}>Find a task by name
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '20px' }}></i>
                </h2>
                {expandNames &&
                    <div>
                        <input type="text" placeholder="Search tasks by name" value={taskName} onChange={(event) => setTaskName(event.target.value)} />
                        <div className="task-container">
                            {findTasksByName().map(task => (
                                <div className="task-item" key={task._id}>
                                    <div className="task-name">
                                        {task.name + ' (' + task.time + ')'}
                                    </div>
                                    <div className="task-date">
                                        <strong>{task.date}</strong>
                                    </div>
                                    <div className="task-label">
                                        {task.label}
                                    </div>
                                    <button
                                        className="scroll-button"
                                        onClick={() => handleScrollToTop(task.date)}
                                    >
                                        Go to task
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className='find-by-label-container'>
                <h2 onClick={() => setExpandLabels(!expandLabels)} style={{ cursor: 'pointer' }}>Find a task by label
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '20px' }}></i>
                </h2>
                {expandLabels &&
                    <div>
                        <select value={taskLabel} onChange={(event) => setTaskLabel(event.target.value)}>
                            {labels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                        <div className="task-container">
                            {findTasksByLabel().map(task => (
                                <div className="task-item" key={task._id}>
                                    <div className="task-name">
                                        {task.name + ' (' + task.time + ')'}
                                    </div>
                                    <div className="task-date">
                                        <strong>{task.date}</strong>
                                    </div>
                                    <div className="task-label">
                                        {task.label}
                                    </div>
                                    <button
                                        className="scroll-button"
                                        onClick={() => handleScrollToTop(task.date)}
                                    >
                                        Go to task
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className='find-by-category-container'>
                <h2 onClick={() => setExpandCategories(!expandCategories)} style={{ cursor: 'pointer' }}>Find a task by category
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: '20px' }}></i>
                </h2>
                {expandCategories &&
                    <div>
                        <select value={taskCategory} onChange={(event) => setTaskCategory(event.target.value)}>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <div className="task-container">
                            {findTasksByCategory().map(task => (
                                <div className="task-item" key={task._id}>
                                    <div className="task-name">
                                        {task.name + ' (' + task.time + ')'}
                                    </div>
                                    <div className="task-date">
                                        <strong>{task.date}</strong>
                                    </div>
                                    <div className="task-category">
                                        {task.category}
                                    </div>
                                    <button
                                        className="scroll-button"
                                        onClick={() => handleScrollToTop(task.date)}
                                    >
                                        Go to task
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default FindTasks;

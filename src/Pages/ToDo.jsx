import React, { useEffect, useState } from 'react';
import { fetchTodoAPI, postTodoAPI, removeTodoAPI } from '../Util/fetch';
import { ObjectId } from 'bson';

const ToDo = () => {
    const [todoData, setTodoData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            const task = {
                _id: new ObjectId().toString(),
                name: inputValue.trim(),
                type: 'todo',
            }
            console.log("adding task", task)
            postTodoAPI(task, setTodoData)
            setInputValue('');
        }
    };

    useEffect(() => {
        fetchTodoAPI(setTodoData)
    }, []);

    const handleDragStart = (event, index, listType) => {
        event.dataTransfer.setData('index', index);
        event.dataTransfer.setData('listType', listType);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, listType) => {
        const draggedIndex = parseInt(event.dataTransfer.getData('index'), 10);
        const item = todoData[draggedIndex];
        postTodoAPI({ ...item, type: listType }, setTodoData);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>To Do</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Add new item"
            />
            <button onClick={(handleAddItem)}>Add</button>

            <div className="lists-container">
                <div className="todo-list"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, 'todo')}>
                    <h2>To Do</h2>
                    <ul style={{ border: '1px solid black' }}>
                        {todoData
                            .filter(item => item.type === 'todo')
                            .map((item, index) => (
                                <li key={index}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, index, 'todo')}>
                                    {item.name}
                                    <button style={{ marginLeft: '10px', fontSize: '8px', padding: '0px', position: 'relative', top: '-3px', right: '0px' }} onClick={() => removeTodoAPI(item, setTodoData)}>X</button>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="done-list"
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, 'done')}>
                    <h2>Done</h2>
                    <ul style={{ border: '1px solid black' }}>
                        {todoData
                            .filter(item => item.type === 'done')
                            .map((item, index) => (
                                <li key={index}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, index, 'done')}>
                                    {item.name}
                                    <button style={{ marginLeft: '10px', fontSize: '8px', padding: '0px', position: 'relative', top: '-3px', right: '0px' }} onClick={() => removeTodoAPI(item, setTodoData)}>X</button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ToDo;

import React, { useEffect, useState } from 'react';
import { fetchTodoAPI, postTodoAPI, removeTodoAPI } from '../../Util/todoAPI';

const ToDo = () => {
    const [todoData, setTodoData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [editing, setEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingName, setEditingName] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            const task = {
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
        const draggedIndex = event.dataTransfer.getData('index');
        const draggedItem = todoData.find(task => task._id === draggedIndex);
        postTodoAPI({ ...draggedItem, type: listType }, setTodoData);
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
                                <li key={item._id}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, item._id, 'todo')}
                                    onDoubleClick={() => {
                                        setEditingIndex(item._id);
                                        setEditing(true);
                                        setEditingName(item.name)
                                    }}
                                    onKeyDown={(event) => event.key === 'Enter' && setEditing(false) && setEditingIndex(null)}
                                >
                                    {(!editing || editingIndex !== item._id) && (
                                        <div>
                                            {item.name}
                                            <button style={{ marginLeft: '10px', fontSize: '8px', padding: '0px', position: 'relative', top: '-3px', right: '0px' }} onClick={() => removeTodoAPI(item, setTodoData)}>X</button>
                                        </div>
                                    )}

                                    {editing && editingIndex === item._id && <input type="text" style={{width: '95%'}} value={editingName} onChange={(event) => setEditingName(event.target.value)} autoFocus />}
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
                                <li key={item._id}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, item._id, 'done')}
                                    onDoubleClick={() => {
                                        setEditingIndex(item._id);
                                        setEditing(true);
                                        setEditingName(item.name)
                                    }}
                                    onKeyDown={(event) => event.key === 'Enter' && setEditing(false) && setEditingIndex(null)}
                                >
                                    {(!editing || editingIndex !== item._id) && (
                                        <div>
                                            {item.name}
                                            <button style={{ marginLeft: '10px', fontSize: '8px', padding: '0px', position: 'relative', top: '-3px', right: '0px' }} onClick={() => removeTodoAPI(item, setTodoData)}>X</button>
                                        </div>
                                    )}
                                    {editing && editingIndex === item._id && <input type="text" style={{width: '95%'}} value={editingName} onChange={(event) => setEditingName(event.target.value)} autoFocus />}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default ToDo;

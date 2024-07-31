export const fetchTodoAPI = (setTodoData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/todo/todo-items`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setTodoData(data);
            console.log("setting data: ", data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

export const postTodoAPI = (task, setTodoData) => {
    const token = localStorage.getItem('agenda_token');
    const activityId = task._id ? task._id : '0';
    fetch(`${process.env.REACT_APP_MONGO_PATH}/todo/todo-item/${activityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    })
        .then((response) => response.json())
        .then((data) => {
            fetchTodoAPI(setTodoData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const removeTodoAPI = (task, setTodoData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/todo/todo-item/${task._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(() => {
            fetchTodoAPI(setTodoData);
        })
        .catch((error) => {
            console.error('Error removing task:', error);
        });
}
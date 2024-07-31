

export const fetchAPI = (setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch('http://localhost:5000/mongodb/all-items', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}


export const postAPI = (task, setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`http://localhost:5000/mongodb/item/${task._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log('Updated document:', data);
            fetchAPI(setData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const removeAPI = (task, setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`http://localhost:5000/mongodb/item/${task._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(() => {
            // console.log('Task removed');
            fetchAPI(setData);
        })
        .catch((error) => {
            console.error('Error removing task:', error);
        });
}

export const fetchTodoAPI = (setTodoData) => {
    const token = localStorage.getItem('agenda_token');
    fetch('http://localhost:5000/todo/mongodb/all-todo-items', {
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
    fetch(`http://localhost:5000/todo/mongodb/todo-item/${task._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log('Updated document:', data);
            fetchTodoAPI(setTodoData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const removeTodoAPI = (task, setTodoData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`http://localhost:5000/todo/mongodb/todo-item/${task._id}`, {
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

export const postFinanceAPI = (row, setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`http://localhost:5000/finance/mongodb/finance/${row._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(row),
    })
        .then((response) => response.json())
        .then(() => {
            // fetchFinanceAPI(setData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const fetchFinanceAPI = (setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch('http://localhost:5000/finance/mongodb/finance', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

export const fetchMappingAPI = (setMapping) => {
    const token = localStorage.getItem('agenda_token');
    fetch('http://localhost:5000/finance/mongodb/finance/mapping', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            setMapping(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}


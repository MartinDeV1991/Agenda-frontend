

export const fetchAPI = (setData) => {
    fetch('http://localhost:5000/mongodb/all-items')
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}


export const postAPI = (task, setData) => {
    fetch(`http://localhost:5000/mongodb/item/${task._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    fetch(`http://localhost:5000/mongodb/item/${task._id}`, {
        method: 'DELETE',
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
    fetch('http://localhost:5000/todo/mongodb/all-todo-items')
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
    fetch(`http://localhost:5000/todo/mongodb/todo-item/${task._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    fetch(`http://localhost:5000/todo/mongodb/todo-item/${task._id}`, {
        method: 'DELETE',
    })
        .then(() => {
            // console.log('Task removed');
            fetchTodoAPI(setTodoData);
        })
        .catch((error) => {
            console.error('Error removing task:', error);
        });
}



export const postFinanceAPI = (row, setData) => {
    console.log(row)
    fetch(`http://localhost:5000/finance/mongodb/finance/${row._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
    fetch('http://localhost:5000/finance/mongodb/finance')
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

export const fetchMappingAPI = (setMapping) => {
    fetch('http://localhost:5000/finance/mongodb/finance/mapping')
        .then((response) => response.json())
        .then((data) => {
            setMapping(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}


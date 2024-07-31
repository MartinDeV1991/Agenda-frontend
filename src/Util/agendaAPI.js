

export const fetchAPI = (setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/agenda/agenda-items`, {
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
    const activityId = task._id ? task._id : '0';
    fetch(`${process.env.REACT_APP_MONGO_PATH}/agenda/agenda-item/${activityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    })
        .then((response) => response.json())
        .then((data) => {
            fetchAPI(setData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const removeAPI = (task, setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/agenda/agenda-item/${task._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(() => {
            fetchAPI(setData);
        })
        .catch((error) => {
            console.error('Error removing task:', error);
        });
}

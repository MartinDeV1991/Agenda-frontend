

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
            console.log('Updated document:', data);
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
            console.log('Task removed');
            fetchAPI(setData);
        })
        .catch((error) => {
            console.error('Error removing task:', error);
        });
}

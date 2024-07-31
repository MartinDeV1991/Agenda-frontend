export const postFinanceAPI = (row, setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/finance/finance-item/${row._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(row),
    })
        .then((response) => response.json())
        .then(() => {
            fetchFinanceAPI(setData);
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

export const fetchFinanceAPI = (setData) => {
    const token = localStorage.getItem('agenda_token');
    fetch(`${process.env.REACT_APP_MONGO_PATH}/finance/finance-items`, {
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
    fetch(`${process.env.REACT_APP_MONGO_PATH}/finance/account-mapping`, {
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

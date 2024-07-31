
export const signUp = async (data) => {
    try {
        const response = await fetch(`http://localhost:5000/user/mongodb/signup`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok)
            throw new Error("Network response was not ok: " + response.status);
        return await response.json();
    } catch (error) {
        console.error("There was a problem with your post operation:", error);
        throw error;
    }
};

export const login = async (loginRequest) => {
    try {
        const response = await fetch('http://localhost:5000/user/mongodb/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was an error with the login request:', error);
        throw error;
    }
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfoPage = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch username from backend when component mounts
        fetchUsername();
    }, []);

    const fetchUsername = async () => {
        try {
            const response = await axios.get('/api/userinfo'); // Assuming your backend has an endpoint to fetch user info
            setUsername(response.data.username); // Assuming the username is returned in the response data
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    };

    return (
        <div>
            <h1>User Information</h1>
            <p>Welcome, {username}!</p>
        </div>
    );
};

export default UserInfoPage;

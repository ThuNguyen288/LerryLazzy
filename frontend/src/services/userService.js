import axios from '../axios';

let handleLoginApi = (username, password) => {
    return axios.post('/api/login', 
    { username, password },  {
        headers: { 
            'Content-Type': 'application/json'
        },
    });
}

let handleRegisterApi = (userData) => {
    return axios.post('/api/register', userData);
};

let handleShowProfile = (token) => {
    return axios.get('/api/protected/show-profile', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
}

const handleUpdateProfile = (token, data) => {
    return axios.put('/api/protected/update-profile', data, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
};

export {
    handleLoginApi,
    handleRegisterApi,
    handleShowProfile,
    handleUpdateProfile
};


import axios from '../axios';

let handleLoginApi = (username, password) => {
    return axios.post('/api/login', 
    { username, password },  {
        headers: { 'Content-Type': 'application/json'},
    });
}

let handleRegisterApi = (userData) => {
    return axios.post('/api/register', userData);
};

export {
    handleLoginApi,
    handleRegisterApi
};


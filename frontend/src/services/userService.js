import axios from '../axios';

const handleLoginApi = (username, password) => {
    return axios.post('/api/login', { username, password });
}

const handleRegisterApi = (userData) => {
    return axios.post('/api/register', userData);
};

export {
    handleLoginApi,
    handleRegisterApi
};

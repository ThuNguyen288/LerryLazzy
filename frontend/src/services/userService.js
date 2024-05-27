import axios from '../axios';

const handleLoginApi = (username, password) => {
    return axios.post('/api/login', {username, password});
}

export {handleLoginApi}
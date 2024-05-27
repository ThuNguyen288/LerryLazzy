import axios from '../axios';

const handleLoginApi = (usernameInput, passwordInput) => {
    return axios.post('/api/login', {
        username: usernameInput, 
        password: passwordInput
    });
}

export {handleLoginApi}
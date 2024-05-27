import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true
});

// Set up interceptor for axios
instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return response.data;
    },
);

export default instance;
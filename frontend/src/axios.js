import axios from 'axios';
import config from './config';

const instance = axios.create({
    baseURL: config.api.REACT_APP_API_BASE_URL,
    withCredentials: true
});

// Error constructor
const createError = (httpStatusCode, statusCode, errorMessage, problems, errorCode = '') => {
    const error = new Error();
    error.httpStatusCode = httpStatusCode;
    error.statusCode = statusCode;
    error.errorMessage = errorMessage;
    error.problems = problems;
    error.errorCode = errorCode + "";
    return error;
};

// Function to check the success status code
export const isSuccessStatusCode = (s) => {
    const statusType = typeof s;
    return (statusType === 'number' && s === 0) || (statusType === 'string' && s.toUpperCase() === 'OK');
};

// Set up interceptor for axios
instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        if (data.hasOwnProperty('s') && !isSuccessStatusCode(data['s']) && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg'], null, data['errcode'] ? data['errcode'] : ""));
        }
        if (data.hasOwnProperty('s') && data.hasOwnProperty('d')) {
            return data['d'];
        }
        if (data.hasOwnProperty('s') && Object.keys(data).length === 1) {
            return null;
        }
        return response.data;
    },
    (error) => {
        const { response } = error;
        if (response == null) {
            return Promise.reject(error);
        }
        const { data } = response;
        if (data.hasOwnProperty('s') && data.hasOwnProperty('errmsg')) {
            return Promise.reject(createError(response.status, data['s'], data['errmsg']));
        }
        if (data.hasOwnProperty('code') && data.hasOwnProperty('message')) {
            return Promise.reject(createError(response.status, data['code'], data['message'], data['problems']));
        }
        return Promise.reject(createError(response.status));
    }
);

export default instance;
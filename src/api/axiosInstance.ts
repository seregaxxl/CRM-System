import axios from "axios";

const API = 'https://easydev.club/api/v1';

const axiosInstance = axios.create({
    baseURL: API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
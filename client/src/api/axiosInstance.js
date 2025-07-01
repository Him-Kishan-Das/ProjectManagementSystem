import axios from 'axios';

const token = localStorage.getItem('authToken');

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : '',
    },
});

export default axiosInstance;
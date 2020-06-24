import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.170:3333'
});

export default api;
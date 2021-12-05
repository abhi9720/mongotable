import axios from 'axios';
import { BACKEND_URL } from '../../constant.js';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL
});

export default axiosInstance;
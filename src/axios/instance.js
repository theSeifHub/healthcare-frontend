import axios from 'axios';
import stores from '../stores';

// const baseURL = 'http://localhost:8000';
const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = () => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
  });

  // Request interceptors 
  instance.interceptors.request.use((reqConfig) => {
    if (stores.authStore && stores.authStore.accessToken) {
      reqConfig.headers.Authorization = `Bearer ${stores.authStore.accessToken}`;
    }
    return reqConfig;
  });

  // Response interceptors // TODO handle any error response with react-toast
  // instance.interceptors.response.use(res => res, err => err)
  return instance;
};

export default axiosInstance();

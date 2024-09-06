import axios from 'axios';
import { getAuthTokenFromCookie } from '../auth'; 


const axiosInstance = axios.create({
  baseURL: 'https://api.manageyourteam.in', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const storedToken = getAuthTokenFromCookie();
    if (storedToken) {
      config.headers.token = `${storedToken}`;
    } else {
      throw new Error('Token not found');
    }
    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
   
    return response;
  },
  (error) => {
   
    if (error.response?.status === 401) {
      console.error('Unauthorized: Token may be invalid or expired');
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

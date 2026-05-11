import axios from 'axios';

const api = axios.create({
  baseURL: 'http://4.224.186.213/evaluation-service',
});

// Add a request interceptor to inject the Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

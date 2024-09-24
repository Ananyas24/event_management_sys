import axios from 'axios';

const api = axios.create({
  baseURL: 'https://event-management-backend-zl2d.onrender.com';  // Correct the base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

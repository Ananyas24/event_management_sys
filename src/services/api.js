import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Correct the base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

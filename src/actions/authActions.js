import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE, USER_LOADED, AUTH_ERROR } from './types';

// Load user based on token in localStorage
export const loadUser = () => async (dispatch) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Set token in headers for all future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      const res = await axios.get('/api/auth/user'); // Fetch user from backend using token
      dispatch({
        type: USER_LOADED,
        payload: res.data, // The user object
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response ? error.response.data : error.message,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
      payload: 'No token found',
    });
  }
};

// Login user
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', credentials);
    const { token, user } = res.data;

    localStorage.setItem('token', token); // Save token to localStorage

    // Set token in headers for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token, user },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Remove token from localStorage
  delete axios.defaults.headers.common['Authorization']; // Remove the token from axios headers
  dispatch({ type: LOGOUT_SUCCESS });
};

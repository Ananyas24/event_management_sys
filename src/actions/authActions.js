import axios from 'axios';
import { toast } from 'react-toastify';  // Import Toastify
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT } from './types';

// Login Action
export const login = (userData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', userData);
    const token = response.data.token;

    localStorage.setItem('token', token);  // Store the token in localStorage

    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });

    toast.success("Login successful!");  // Show success notification

    // Navigate based on role
    const userRole = JSON.parse(atob(token.split('.')[1])).role;
    if (userRole === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.error || 'Login failed',
    });
    toast.error("Login failed. Please try again.");  // Show error notification
  }
};

// Register Action
export const register = (userData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/register', userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    toast.success("Registration successful!");  // Show success notification
    navigate('/login');  // Redirect to login after successful registration
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response?.data?.error || 'Registration failed',
    });
    toast.error("Registration failed. Please try again.");  // Show error notification
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');  // Remove token from localStorage
  dispatch({ type: LOGOUT });
  toast.info("You have been logged out.");  // Show info notification
};

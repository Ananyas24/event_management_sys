import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE } from './types';

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', credentials);
    const { token, user } = res.data;

    localStorage.setItem('token', token);
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

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT_SUCCESS });
};

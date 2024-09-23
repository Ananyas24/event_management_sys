import axios from 'axios';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    const { token, user } = response.data;
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        token,
        user,
      },
    });
    localStorage.setItem('token', token);  // Optionally store token in localStorage
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    dispatch({ type: 'LOGIN_FAIL' });
  }
};


export const logout = () => (dispatch) => {
  // Clear token from localStorage
  localStorage.removeItem('token');

  // Dispatch the logout action
  dispatch({
    type: 'LOGOUT',
  });
};

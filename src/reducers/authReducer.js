import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE, USER_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: false,
  loading: true,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload, // Load the user
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

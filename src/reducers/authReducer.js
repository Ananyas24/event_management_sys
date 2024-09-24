import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, user: action.payload.user, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT_SUCCESS:
      return { ...state, token: null, user: null, error: null };
    default:
      return state;
  }
}

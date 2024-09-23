const initialState = {
  token: null,
  user: null,
  isAuthenticated: false, // Track if the user is authenticated
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true, // Set to true on login success
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false, // Reset on logout
      };
    default:
      return state;
  }
};

export default authReducer;

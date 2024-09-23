import { combineReducers } from 'redux';
import { eventsReducer } from './eventReducer';
import authReducer from './authReducer';  // Import the new auth reducer

const rootReducer = combineReducers({
  events: eventsReducer,  // Handles events-related state
  auth: authReducer,      // Handles authentication-related state
});

export default rootReducer;

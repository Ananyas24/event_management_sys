import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for redux-thunk
import rootReducer from './reducers/rootReducer';

const initialState = {};
const middleware = [thunk]; // Thunk as middleware

const store = createStore(
  rootReducer,
  initialState,
 (applyMiddleware(...middleware)) // Apply middleware with devtools
);

export default store;

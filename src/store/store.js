import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // Import "thunk" directly
import rootReducer from '../reducers/rootReducer';

const store = createStore(rootReducer, (applyMiddleware(thunk)));

export default store;

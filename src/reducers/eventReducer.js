import { SET_EVENTS, EVENT_REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  events: [],
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS:
      return { ...state, events: action.payload };
    case EVENT_REGISTER_SUCCESS:
      return state;
    default:
      return state;
  }
}

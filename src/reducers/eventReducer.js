import {
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from '../actions/types';

const initialState = {
  events: [],
  error: null,
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        error: null,
      };
    case FETCH_EVENTS_FAIL:
    case CREATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
        error: null,
      };
    default:
      return state;
  }
}

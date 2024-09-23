// eventReducer.js
const initialState = [];

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return action.payload; // Update the state with the fetched events
    default:
      return state;
  }
};

import axios from 'axios';

// Action to fetch events
export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('https://event-management-backend-zl2d.onrender.com/api/events');
    dispatch({ type: 'SET_EVENTS', payload: res.data });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const registerEvent = (eventId) => async (dispatch, getState) => {
  const { token } = getState().auth;  // Ensure the token is retrieved from state

  if (!token) {
    console.error('No token found. User is not logged in.');
    return;
  }

  try {
    const response = await axios.post(`/api/events/register-event/${eventId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,  // Correct Bearer token format
      },
    });
    dispatch(fetchEvents());  // Fetch events again after registration
  } catch (error) {
    console.error('Error registering for event:', error.response ? error.response.data : error.message);
  }
};



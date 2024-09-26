import axios from 'axios';
import { SET_EVENTS, EVENT_REGISTER_SUCCESS } from './types';

// Get the API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Log the value of API_BASE_URL to ensure it's correctly picked up
console.log('API_BASE_URL:', API_BASE_URL);

// Fetch events from the API
export const fetchEvents = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/api/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: SET_EVENTS, payload: res.data });
  } catch (error) {
    console.error('Error fetching events:', error);
    if (error.response) {
      console.error(`Error response: ${error.response.status} - ${error.response.data}`);
    }
  }
};

// Register for an event
export const registerEvent = (eventId) => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found');
    return;
  }

  try {
    await axios.post(
      `${API_BASE_URL}/api/events/register-event/${eventId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: EVENT_REGISTER_SUCCESS });
  } catch (error) {
    console.error('Error registering for event:', error);
    if (error.response) {
      console.error(`Error response: ${error.response.status} - ${error.response.data}`);
    }
  }
};

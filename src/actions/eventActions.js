import axios from 'axios';
import { SET_EVENTS, EVENT_REGISTER_SUCCESS } from './types';

export const fetchEvents = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('/api/events', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: SET_EVENTS, payload: res.data });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const registerEvent = (eventId) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    await axios.post(
      `/api/events/register-event/${eventId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: EVENT_REGISTER_SUCCESS });
  } catch (error) {
    console.error('Error registering for event:', error);
  }
};

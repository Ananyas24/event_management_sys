import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAIL,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  REGISTER_EVENT_SUCCESS,
  REGISTER_EVENT_FAIL
} from './types';

// Fetch all events
export const fetchEvents = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/events');
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_EVENTS_FAIL,
      payload: err.response ? err.response.data.error : 'Failed to fetch events',
    });
  }
};

export const createEvent = (eventData, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/events', eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: response.data,
    });
    toast.success("Event created successfully");
    navigate('/admin');
  } catch (err) {
    dispatch({
      type: CREATE_EVENT_FAIL,
      payload: err.response.data.error,
    });
    toast.error("Failed to create event");
  }
};

// Register for an event
export const registerEvent = (eventId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`/api/events/register/${eventId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: REGISTER_EVENT_SUCCESS,
      payload: response.data,
    });
    toast.success("Registered for event successfully");
  } catch (err) {
    dispatch({
      type: REGISTER_EVENT_FAIL,
      payload: err.response ? err.response.data.error : 'Failed to register for event',
    });
    toast.error('Failed to register for event');
  }
};

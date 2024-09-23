import React from 'react';
import { useDispatch } from 'react-redux';
import { registerEvent } from '../actions/eventActions';

const EventRegistration = ({ eventId }) => {
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(registerEvent(eventId));
  };

  return (
    <button onClick={handleRegister}>Register for Event</button>
  );
};

export default EventRegistration;

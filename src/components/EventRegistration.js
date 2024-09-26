import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerEvent } from '../actions/eventActions';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EventRegistration = ({ eventId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerEvent(eventId)); // Dispatch the registration action
      setMessage('Successfully registered for the event!');
    } catch (error) {
      setMessage('Failed to register for the event. Please try again.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <Container>
      <h3>Register for Event</h3>
      {message && <Alert variant={message.includes('Success') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleRegister}>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default EventRegistration;

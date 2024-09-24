import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, registerEvent } from '../actions/eventActions';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const EventList = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events || []);
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState(''); // State to display feedback message

  useEffect(() => {
    dispatch(fetchEvents());  // Fetch events when the component loads
  }, [dispatch]);

  const handleRegister = async (eventId) => {
    if (token) {
      try {
        await dispatch(registerEvent(eventId));
        setMessage('You have successfully registered for the event!');
      } catch (error) {
        setMessage('There was an error registering for the event. Please try again.');
      }
    } else {
      setMessage('Please log in to register for an event.');
    }
  };

  return (
    <Container>
      <h2>Events</h2>
      
      {/* Show feedback message */}
      {message && <Alert variant="info">{message}</Alert>}
      
      <Row>
        {events.map((event) => (
          <Col key={event._id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>{new Date(event.date).toLocaleDateString()}</Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => handleRegister(event._id)}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;

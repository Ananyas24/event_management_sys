import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, registerEvent } from '../actions/eventActions';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const EventList = () => {
  const dispatch = useDispatch();

  // Fetch events and auth data from the Redux store
  const events = useSelector((state) => state.events.events || []);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // Assuming auth.user contains user details
  console.log(user,"pqrs")
  const [message, setMessage] = useState(''); // State to display feedback message

  // Fetch events when the component loads
  useEffect(() => {

    dispatch(fetchEvents());
  }, [dispatch]);
  
  useEffect(() => {
    console.log('Redux state user:', user);  // This will log whenever user state changes
  }, [user]);

  // Handle the registration for an event
  const handleRegister = async (eventId) => {
    console.log('User Role:', user.role); // Check the user's role before attempting registration
    if (token && user && user.role === 'User') {  // Ensure this matches exactly with 'User'
      try {
        await dispatch(registerEvent(eventId));
        setMessage('You have successfully registered for the event!');
      } catch (error) {
        console.error('Error registering for the event:', error);
        setMessage('There was an error registering for the event. Please try again.');
      }
    } else if (!token) {
      setMessage('Please log in to register for an event.');
    } else if (user && user.role !== 'User') {
      setMessage('Only users can register for events.');
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
                {console.log(user,"xyz")}
                {/* Conditionally render the button based on user role */}
                {user && user.role === 'User' ? (
  <Button variant="primary" onClick={() => handleRegister(event._id)}>
    Register
  </Button>
) : (
  <Button variant="secondary" disabled>
    {token ? 'Only users can register' : 'Login to register'}
  </Button>
)}

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;

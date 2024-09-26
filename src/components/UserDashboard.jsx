import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, registerEvent } from '../actions/eventActions';
import { Card, Button, Container } from 'react-bootstrap';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleRegister = (eventId) => {
    dispatch(registerEvent(eventId));
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Available Events</h1>
      <div className="d-flex flex-wrap justify-content-around">
        {events.map((event) => (
          <Card key={event._id} className="mb-4" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text>Date: {new Date(event.date).toLocaleDateString()}</Card.Text>
              <Button variant="primary" onClick={() => handleRegister(event._id)}>
                Register
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default UserDashboard;

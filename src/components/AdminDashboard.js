import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchEvents } from '../actions/eventActions';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events || []);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const isAdmin = user && user.role === 'Admin';

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        '/api/events',
        { name, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Event created successfully!');
      setName('');
      setDescription('');
      setDate('');
      dispatch(fetchEvents());
    } catch (error) {
      setMessage('Error creating event. Please try again.');
    }
  };

  return (
    <Container>
      {isAdmin ? (
        <>
          <h2>Create Event (Admin Only)</h2>
          <Form onSubmit={handleCreateEvent}>
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Create Event</Button>
          </Form>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>You do not have access to create events.</p>
      )}
      <h2>All Events</h2>
      <Row>
        {events.map((event) => (
          <Col key={event._id} md={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <Card.Text>{new Date(event.date).toLocaleDateString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;

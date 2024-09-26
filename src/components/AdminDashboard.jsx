import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../actions/eventActions';
import { Table, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  
  // Fetch events from the Redux store
  const events = useSelector((state) => state.event.events || []);  // Initialize to an empty array if undefined

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <Link to="/create-event">
        <Button variant="success" className="mb-4">
          Create New Event
        </Button>
      </Link>
      <Card>
        <Card.Body>
          <h4>All Events</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Registered Users</th>
              </tr>
            </thead>
            <tbody>
              {/* Defensive check: map only if events is an array */}
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event._id}>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.registeredUsers?.length || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No events found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Table } from 'react-bootstrap';  // Import Bootstrap components
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);  // Store fetched events

  // Fetch all events from the backend when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);  // Set the fetched events
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/events', { name, description, date });
      toast.success('Event created successfully!');
      setName('');
      setDescription('');
      setDate('');
      // Fetch updated events after creation
      const updatedEvents = await axios.get('/api/events');
      setEvents(updatedEvents.data);  // Update the events list after creating a new event
    } catch (error) {
      console.error('Failed to create event:', error);
      toast.error('Failed to create event. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      {/* Display All Events */}
      <h3 className="mb-4">All Events</h3>
      {events.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Registered Users</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.registeredUsers ? event.registeredUsers.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No events available</p>
      )}
    </Container>
  );
};

export default AdminDashboard;

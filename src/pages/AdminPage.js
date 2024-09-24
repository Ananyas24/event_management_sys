import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchEvents } from '../actions/eventActions';

const AdminPage = () => {
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
    <div>
      {isAdmin ? (
        <>
          <h2>Create Event (Admin Only)</h2>
          <form onSubmit={handleCreateEvent}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Event Name"
              required
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <button type="submit">Create Event</button>
          </form>
          {message && <p>{message}</p>}
        </>
      ) : (
        <p>You do not have access to create events.</p>
      )}
      <h2>All Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default AdminPage;

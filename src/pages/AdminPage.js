import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../actions/eventActions'; // Ensure fetchEvents action is available
import axios from 'axios';
import './AdminPage.css'; // We'll add some CSS to style the cards

const AdminPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  
  // Fetch events from Redux state
  const events = useSelector((state) => state.events || []); // Fallback to empty array

  const token = localStorage.getItem('token'); // Get token from localStorage

  // Fetch all events on component mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle event creation
  const handleCreateEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://event-management-backend-zl2d.onrender.com/api/events', {
        name,
        description,
        date,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response,"response")
      setMessage('Event created successfully!');
      setName('');
      setDescription('');
      setDate('');

      // Fetch events again to update the cards
      dispatch(fetchEvents());
    } catch (error) {
      setMessage('Error creating event. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Create Event (Admin Only)</h2>
      <form onSubmit={handleCreateEvent} className="event-form">
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}

      {/* Display events in card format */}
      <h2>All Events</h2>
      <div className="card-container">
        {Array.isArray(events) && events.length > 0 ? (  // Check if events is an array and not empty
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No events available.</p>  // Show a message if there are no events
        )}
      </div>
    </div>
  );
};

export default AdminPage;

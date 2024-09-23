import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, registerEvent } from '../actions/eventActions';  // Import actions

const EventList = () => {
  const dispatch = useDispatch();

  // Safely accessing events with a fallback to an empty array
  const events = useSelector((state) => state.events || []);
  const token = useSelector((state) => state.auth?.token); // Safe access using optional chaining

  useEffect(() => {
    dispatch(fetchEvents());  // Fetch events when the component loads
  }, [dispatch]);

  const handleRegister = (eventId) => {
    if (token) {
      dispatch(registerEvent(eventId));  // Register for event when the button is clicked
    } else {
      console.error('User is not logged in');
      // Optionally, display a login prompt or redirect to login page
    }
  };

  return (
    <div>
      <h2>Events</h2>
      {events.length === 0 ? (  // Check if events array is empty
        <p>No events available. Please check back later.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleRegister(event._id)}>
                    Register
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventList;

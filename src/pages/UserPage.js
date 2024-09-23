import React from 'react';
import EventList from '../components/EventList';
import EventRegistration from '../components/EventRegistration';

const UserPage = () => {
  return (
    <div>
      <h1>Event Registration</h1>
      <EventList />
      {/* Example usage of event registration, eventId should be dynamic */}
      <EventRegistration eventId="exampleEventId" />
    </div>
  );
};

export default UserPage;

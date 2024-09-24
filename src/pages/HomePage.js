import React from 'react';
import { Container } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <h1>Welcome to the Event Management System</h1>
      <p>
        This platform allows users to register for events and admins to manage events.
      </p>
    </Container>
  );
};

export default HomePage;

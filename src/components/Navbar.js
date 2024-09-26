import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { logout } from '../actions/authActions';

const AppNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get the authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  // Ensure the token is a string and valid before splitting
  let userRole = null;
  if (token && typeof token === 'string') {
    try {
      userRole = JSON.parse(atob(token.split('.')[1])).role;  // Decode the token safely
    } catch (err) {
      console.error("Error decoding token", err);
    }
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
    navigate('/login');  // Redirect to login page
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Event Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* If not authenticated, show Login and Register */}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}

            {/* If Admin, show Admin-specific links */}
            {isAuthenticated && userRole === 'Admin' && (
              <>
                <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/create-event">Create Event</Nav.Link>
              </>
            )}

            {/* If User, show User-specific links */}
            {isAuthenticated && userRole === 'User' && (
              <Nav.Link as={Link} to="/user">User Dashboard</Nav.Link>
            )}

            {/* Show Logout button if authenticated */}
            {isAuthenticated && (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

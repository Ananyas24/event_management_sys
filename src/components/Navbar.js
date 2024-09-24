import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Event Management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/events">Events</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              <Nav.Link as={Link} to="/user">User Dashboard</Nav.Link>
            </>
          )}
        </Nav>
        {isAuthenticated ? (
          <Button onClick={handleLogout} variant="outline-light">
            Logout
          </Button>
        ) : (
          <>
            <Button as={Link} to="/login" variant="outline-light" className="mr-2">
              Login
            </Button>
            <Button as={Link} to="/register" variant="outline-light">
              Register
            </Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;

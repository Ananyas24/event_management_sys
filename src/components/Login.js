import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .then((user) => {
        console.log(user, "Logged in user");
        navigate('/user'); // Redirect to User Dashboard on login success
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

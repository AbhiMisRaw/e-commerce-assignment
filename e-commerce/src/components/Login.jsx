// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

   const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password,
      });

      // Handle successful login
      const { token, user, message } = response.data;
      console.log('Login successful:', response.data);

      // Save token and user details in browser memory
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert(message);
      navigate('/user'); // Redirect to user page
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response.data);
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button className='align-items-center' variant="primary" onClick={handleLogin}>
          Login
        </Button>
        <div style={{ float: 'right' }}>Don't have a account?<a href='/signup'>Create one!</a></div>
      </Form>
    </div>
  );
};

export default Login;

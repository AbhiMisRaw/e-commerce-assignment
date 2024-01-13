import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('CUSTOMER'); // Default value is CUSTOMER
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      console.log("request is going to send");
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        email,
        user_type: userType,
        password,
      });

      // Handle successful registration
      console.log('Signup successful:', response.data);
      alert('Signup successful. Now you can login.');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      // Handle registration error
      console.error('Signup failed:', error.response.data);
      setError('Failed to create user. Please check the error details.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUserType">
          <Form.Label>User Type</Form.Label>
          <Dropdown onSelect={(selectedType) => setUserType(selectedType)}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {userType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
              <Dropdown.Item eventKey="SELLER">SELLER</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
        <Button variant="primary" onClick={handleSignup}>
          Signup
        </Button>
        <div style={{ float: 'right' }}>Already a member?<a href='/login'>Click here</a></div>
      </Form>
    </div>
  );
};

export default Signup;

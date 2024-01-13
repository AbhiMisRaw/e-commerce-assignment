import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Image } from 'react-bootstrap';

function User() {
     const navigate = useNavigate()
     const token = localStorage.getItem('token');
    // const user = JSON.parse(localStorage.getItem('user'));

    if (token === null ) {
      navigate('/login')
    } 
    const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="container">
        <Container className="mt-4">
      <Row className='shadow-lg p-3 mb-5 bg-white rounded'>
        <Col md={4} className="text-center">
          
          <Image
            src="https://cdn.iconscout.com/icon/free/png-512/free-user-3604612-3005548.png?f=webp&w=256" 
            
            className="mb-5"
          />
        </Col>
        <Col md={8} className="text-center " >
          
          <h2 style={{backgroundColor:"white"}}>
            {user.first_name === "" ? "Add your Details" : user.first_name+ " "+user.last_name }
            
            
            </h2>
          <p>
            <strong>@{user.username}</strong> 
          </p>
         
          <p>
            <strong>Email:</strong> {user.email}
          </p>
           <p>Available balance : $ <strong>{user.wallet_balance}</strong></p>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default User
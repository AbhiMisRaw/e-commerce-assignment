import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
    const navigate = useNavigate()
  const [categoryName, setCategoryName] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  const handleSaveCategory = () => {
    const data = {
      category_name: categoryName,
      is_active: isActive,
    };

    axios.post('http://127.0.0.1:8000/seller/categories', data, {
             headers: {
                    Authorization: 'Token '.concat(localStorage.getItem("token"))
            }
        }).then(response => {
        console.log('Category created:', response.data);
        navigate('/categories')
      }).catch(error => console.error(error));
     
  };

  return (
    <Container>
      <h1>Create New Category</h1>
      <Form>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="isActive">
          <Form.Check
            type="checkbox"
            label="Is Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSaveCategory}>
          Save Category
        </Button>
      </Form>
    </Container>
  );
};

export default CategoryForm;

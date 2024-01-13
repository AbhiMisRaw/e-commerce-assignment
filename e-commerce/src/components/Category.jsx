import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    axios.get(
        'http://127.0.0.1:8000/seller/categories', {
            headers: { Authorization: 'Token '.concat(localStorage.getItem("token")) }
          }
        )
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error(error));
  }, []);
  function createCategory(){
    navigate('/addCategory')
  }
function editCategory(){

}
  const deleteCategory = (categoryId) => {
  axios.delete(`http://127.0.0.1:8000/seller/categories/${categoryId}`, {
    headers: {
      Authorization: 'Token '.concat(localStorage.getItem("token"))
    }
  })
    .then(response => {
      console.log('Category deleted:', response.data);
      // Perform any necessary actions after successful deletion
    })
    .catch(error => console.error(error));
    navigate('/categories')
};

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" className="mb-3" style={{ float: 'right' }} onClick={createCategory}>
            Add Category
          </Button>
        </Col>
      </Row>

      <Row>
        {categories.map(category => {
            console.log(category)
            return(
          <Col key={category.id}>
            <Card className="mb-3 shadow p-3 mb-5 bg-white rounded">
              <Card.Body >
                <Card.Title>{category.category_name}</Card.Title>
                <Card.Text>
                  {category.is_active ? 'Active' : 'Inactive'}
                </Card.Text>
                {/* Add more category details as needed */}
                <Button onClick={editCategory} > <CiEdit /> </Button>
                <Button variant="danger" onClick={() => deleteCategory(category.id)} style={{ marginLeft:"1%"}} className="ml-2"><MdDeleteForever /></Button>
              </Card.Body>
            </Card>
          </Col>
            )}
            )
        }
      </Row>
    </Container>
  );
};

export default Category;
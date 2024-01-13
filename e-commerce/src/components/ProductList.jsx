import React, { useState, useEffect } from 'react';
import { Container, Row, Badge, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
    const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/seller/products ',  {
            headers: { 
                Authorization: 'Token '.concat(localStorage.getItem("token")) 
            }
        });  // Update with your API endpoint
      const data = await response.json();
      console.log(data)
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  function handleNewProductClick(){
    navigate("/addProduct")
  }

  return (
    <Container>
        {
        products.length === 0 ? 
        
        <Row> 
            <Col md="auto">
            <h4>You have no Products😥. Want to add some product? <Badge bg="secondary" style={{cursor:"pointer"}} onClick={handleNewProductClick}>Click here</Badge></h4>
            </Col>
            
        </Row>
        : <ProductCard />
        }
    </Container>
  );
};

function ProductCard({products}) {
  return (
    <>
     <h1 className="my-4">Product List</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.product_id} md={4} className="mb-4">
            <Card>
              {/* You can customize the card content based on your Product model */}
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Stock Count: {product.stock_count}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Selling Price: ${product.selling_price}</Card.Text>
                {/* Add other card content based on your Product model */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}


export default ProductList;

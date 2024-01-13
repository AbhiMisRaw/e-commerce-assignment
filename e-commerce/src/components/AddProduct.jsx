import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct({product, create=true}) {
   const navigate = useNavigate()
    const [formData, setFormData] = useState({
                                title: '',
                                description: '',
                                stock_count: 0,
                                price: 0,
                                selling_price: 0,
                                product_category: '',
                                is_active: false,
                            });
    const categories = ["Electronics", "Apparel", "Footwear"];
    if (!create){
        setFormData(product)
    }
    const handleChange = (e) => {
         const { name, value, checked, type } = e.target
        setFormData(prevData => (
            { ...prevData,
              [name]: type === 'checkbox' ? checked : value,
            }
        ));
    };

     const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = create ? `seller/products` : 'seller/product/'.concat(product.product_id);

    axios({
      method: create ? 'post' : 'put',
      url: "http://127.0.0.1:8000/".concat(endpoint),
      data: formData,
      headers: {
        Authorization: 'Token '.concat(localStorage.getItem("token"))
      }
    })
    .then(response => {
      console.log('Product saved successfully:', response.data);
      navigate("/single-product")
    })
    .catch(error => console.error('Error saving product:', error));
  };


  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="stock_count">
        <Form.Label>Stock Count</Form.Label>
        <Form.Control
          type="number"
          name="stock_count"
          value={formData.stock_count}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="selling_price">
        <Form.Label>Selling Price</Form.Label>
        <Form.Control
          type="number"
          name="selling_price"
          value={formData.selling_price}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="product_category">
        <Form.Label>Product Category</Form.Label>
        <Form.Control
          as="select"
          name="product_category"
          value={formData.product_category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
        <br />
      </Form.Group>
       <Form.Group controlId="is_active" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Mark for sell"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
      </Form.Group>
      <br/>
      <Row></Row>
      <Button style={{width:"20%", margin:"auto", float:"right"}} variant="primary" type="submit">
        {create ? 'Create' : 'Update'}
      </Button>
      <Button style={{width:"20%", margin:"auto", float:"right", margin:"2px"}} variant="danger" type="reset">
        Reset
      </Button>
      
    </Form>
    </>
  )
}

export default AddProduct

 


// const ProductForm = ({ productId, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     stock_count: 0,
//     price: 0,
//     selling_price: 0,
//     product_category: '',
//   });

//   // Hardcoded product categories
  

//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     // Check if productId is provided, indicating edit mode
//     if (productId) {
//       setIsEditMode(true);
//       // Fetch product details and set the form data
//       axios.get(`/api/seller/product/${productId}/`)
//         .then(response => setFormData(response.data))
//         .catch(error => console.error('Error fetching product details:', error));
//     }
//   }, [productId]);

  

 
//   return (
    
//   );
// };

// export default ProductForm;


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import User from './components/User';
import Product from './components/Product';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import Category from './components/Category';
import CategoryForm from './components/CategoryForm';

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Navigation />
        
          <div className="container mt-4">
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/your-products" element={<ProductList />} />
            <Route path="/single-product" element={<Product />} />
            <Route path="/addProduct" element={<AddProduct/>}/>
            <Route path='/categories' element={<Category />}/>
            <Route path='/addCategory' element={<CategoryForm />}/>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App

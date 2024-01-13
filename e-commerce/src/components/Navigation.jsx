import React from 'react'

import { useNavigate, Link } from 'react-router-dom';


function Navigation() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userLoggedIn = true;
    if(token === null){
        userLoggedIn = false;
    }
    
    function handleButtonClick(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert("Are you sure you want to log-out? ");
        navigate("/login");
    }
  return (
    <nav className="navbar  navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">E-Commerce</Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          {userLoggedIn ? "" : <Link to="/login" className="nav-link">Login</Link>}
        </li>
        <li className="nav-item">
            {userLoggedIn ? "" : <Link to="/signup" className="nav-link">Signup</Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link to="/user" className="nav-link">
                    Profile
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link className="nav-link" to="/your-products">
                    Your Product
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link className="nav-link" to="/your-products">
                    Add Product 
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link className="nav-link" onClick={handleButtonClick}>
                    Logout
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link to="/categories" className="nav-link">
                    Category
                </Link>}
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
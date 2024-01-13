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
      <ul className="navbar-nav mr-auto flex-column flex-md-row">
        <li className="nav-item">
          {userLoggedIn ? "" : <Link to="/login" className="nav-link mx-2">Login</Link>}
        </li>
        <li className="nav-item">
            {userLoggedIn ? "" : <Link to="/signup" className="nav-link mx-2">Signup</Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link to="/user" className="nav-link mx-2">
                    Profile
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn && localStorage.getItem("user").user_type ==="SELLER" ? "" : <Link className="nav-link mx-2" to="/your-products">
                    Your Product
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn && localStorage.getItem("user").user_type ==="SELLER" ? "" :
             <Link className="nav-link mx-2" to="/your-products">
                    Add Product 
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn ? "" : <Link className="nav-link mx-2" onClick={handleButtonClick}>
                    Logout
                </Link>}
        </li>
        <li className="nav-item">
            { !userLoggedIn && localStorage.getItem("user").user_type ==="SELLER" ? "" : 
            <Link to="/categories" className="nav-link mx-2">
                    Category
                </Link>}
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
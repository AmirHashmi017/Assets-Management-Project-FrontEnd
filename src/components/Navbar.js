import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/font-awesome.min.css';
import '../assets/css/linearicons.css';
import '../assets/css/animate.css';
import '../assets/css/flaticon.css';
import '../assets/css/slick.css';
import '../assets/css/slick-theme.css';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootsnav.css';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import './Nav.css';
import 'https://code.jquery.com/jquery-3.6.0.min.js';
import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';





const Navbar = () => {
  return (
    <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
      <div className="container">
        <div className="navbar-header">
          <img className="logo" src="assets/images/logo.jpeg" alt="logo" style={{ width: '200px', height: '70px', marginTop: '10px' }} />
        </div>
        <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
          <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
            <li className="scroll active">
              <a ><Link to="/">Home</Link></a>
            </li>
            <li className="scroll dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Manage <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#"><Link to="/productCrud">Products</Link></a></li>
                <li><a href="#"><Link to="/customerCrud">Customers</Link></a></li>
                <li><a href="#"><Link to="/providerCrud">Providers</Link></a></li>
                <li><a href="#"><Link to="/locationCrud">Locations</Link></a></li>
                <li><a href="#">Order</a></li>
                <li><a href="#">Inventory</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Warehouses</a></li>
              </ul>
            </li>
            <li className="scroll">
              <a href="#">Dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

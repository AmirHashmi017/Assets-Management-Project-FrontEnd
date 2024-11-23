import React from 'react';
import Navbar from './Navbar';
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
import './HomePage.css';
import 'https://code.jquery.com/jquery-3.6.0.min.js';
import 'https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <section id="home" className="welcome-hero">
        <div className="container">
          <div className="welcome-hero-txt">
            <br />
            <h2>Revolution Energy Services<br /></h2>
            <p>Reduce Downtime with Innovative Service Delivery.</p>
          </div>
        </div>
      </section>
      <br /><br /><br /><br />
      <section id="works" className="works">
        <div className="container">
          <div className="section-header">
            <h2>How it Works</h2>
            <p>Learn More about us</p>
          </div>
          <div className="works-content">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-lightbulb-idea"></i>
                  </div>
                  <h2><a href="#">Innovative Energy Solutions</a></h2>
                  <p>
                    Reduce your energy costs and carbon footprint with our innovative energy solutions. Our team of experts will help you find the perfect solution for your home or business, so you can start saving money and the environment today.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-networking"></i>
                  </div>
                  <h2><a href="#">Our Experienced Team</a></h2>
                  <p>
                    Safety Focused crews with decades of experience in the oil and gas industry. Our team is dedicated to providing the highest quality service to our customers, ensuring that your project is completed safely, on time, and within budget.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="single-how-works">
                  <div className="single-how-works-icon">
                    <i className="flaticon-location-on-road"></i>
                  </div>
                  <h2><a href="#">Sustainable Living Starts Here</a></h2>
                  <p>
                    Transform your home or business with eco-friendly energy systems that deliver unmatched efficiency. Let us help you create a sustainable future while reducing costs and supporting environmental well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

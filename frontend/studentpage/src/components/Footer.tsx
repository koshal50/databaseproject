import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-dark text-white'}`}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4" data-aos="fade-up">
            <h4 className="fw-bold mb-4">
              <span className="text-primary">Campus</span>Sports
            </h4>
            <p className="mb-4">
              Your hub for all campus sports activities. Discover events, join teams, and stay connected with the  sports-SYNC community.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-md-4 col-lg-2" data-aos="fade-up" data-aos-delay="100">
            <h5 className="fw-bold mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#sports" className="text-decoration-none text-white">Sports</a>
              </li>
              <li className="mb-2">
                <a href="#schedule" className="text-decoration-none text-white">Schedule</a>
              </li>
              <li className="mb-2">
                <a href="#teams" className="text-decoration-none text-white">Teams</a>
              </li>
              <li className="mb-2">
                <a href="#register" className="text-decoration-none text-white">Register</a>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <h5 className="fw-bold mb-4">Sports Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">Team Sports</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">Individual Sports</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">Water Sports</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white">Recreational Activities</a>
              </li>
            </ul>
          </div>
          
          <div className="col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <h5 className="fw-bold mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <MapPin size={18} className="me-2" />
                Campus Sports Center, Building 5
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Phone size={18} className="me-2" />
                (123) 456-7890
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Mail size={18} className="me-2" />
                sports@SYNC.edu
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0">
              &copy; {new Date().getFullYear()} CampusSports. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small mb-0">
              <a href="#" className="text-white text-decoration-none">Privacy Policy</a>
              {' | '}
              <a href="#" className="text-white text-decoration-none">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
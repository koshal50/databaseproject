import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { sports } from '../data/sportsData';

const Header: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sports.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`hero-header py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="row align-items-center min-vh-50">
          <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
            <h1 className="display-4 fw-bold mb-4">
              Campus sports-SYNC
            </h1>
            <p className="lead mb-4">
              Your one-stop destination for all campus sports activities. 
              Browse events, check schedules, join teams, and follow your 
              favorite sports.
            </p>
            <div className="d-flex gap-3">
              <a href="#sports" className="btn btn-primary px-4 py-2">
                Browse Sports
              </a>
              <a href="#register" className="btn btn-outline-primary px-4 py-2">
                Register Now
              </a>
              <a
               href="#Cw" className ="btn btn-outline-primary px-4 py-2">
                Classwork            
                  </a>

            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg" style={{ height: '400px' }}>
              {sports.map((sport, index) => (
                <div
                  key={sport.id}
                  className="position-absolute top-0 start-0 w-100 h-100 transition-opacity"
                  style={{
                    opacity: index === currentImageIndex ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    zIndex: index === currentImageIndex ? 1 : 0,
                  }}
                >
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <h5 className="mb-0">{sport.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
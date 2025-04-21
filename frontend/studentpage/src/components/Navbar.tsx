import React, { useContext, useState } from 'react';
import { Moon, Sun, Menu, X, Home, Calendar, BookOpen, Info, LogOut } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} fixed-top shadow-sm`}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#" data-aos="fade-right">
          <span className="text-primary">sports</span>-SYNC
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item" data-aos="fade-down" data-aos-delay="100">
              <a className="nav-link d-flex align-items-center gap-1" href="#">
                <Home size={18} />
                Home
              </a>
            </li>
            <li className="nav-item" data-aos="fade-down" data-aos-delay="200">
              <a className="nav-link d-flex align-items-center gap-1" href="#schedule">
                <Calendar size={18} />
                Schedules
              </a>
            </li>
            <li className="nav-item" data-aos="fade-down" data-aos-delay="300">
              <a className="nav-link d-flex align-items-center gap-1" href="#classwork">
                <BookOpen size={18} />
                Classwork
              </a>
            </li>
            <li className="nav-item" data-aos="fade-down" data-aos-delay="400">
              <a className="nav-link d-flex align-items-center gap-1" href="#about">
                <Info size={18} />
                About Us
              </a>
            </li>
            <li className="nav-item" data-aos="fade-down" data-aos-delay="500">
              <a className="nav-link d-flex align-items-center gap-1" href="#logout">
                <LogOut size={18} />
                Logout
              </a>
            </li>
            <li className="nav-item ms-lg-3" data-aos="fade-down" data-aos-delay="600">
              <button 
                className="btn btn-sm btn-outline-primary rounded-circle p-2" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
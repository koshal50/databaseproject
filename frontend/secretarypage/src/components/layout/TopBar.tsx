import React from 'react';
import { Bell, ChevronDown, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface TopBarProps {
  toggleSidebar: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <header className="border-bottom shadow-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card-bg)' }}>
      <div className="d-flex align-items-center justify-content-between px-4 py-3">
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-link text-decoration-none d-md-none" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-primary" />
          </button>
          <h1 className="h5 mb-0 ms-md-0 d-none d-sm-block">Teacher Dashboard</h1>
        </div>
        
        <div className="d-flex align-items-center">
          {/* Theme toggle */}
          <button 
            className="btn btn-link text-decoration-none" 
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            data-aos="zoom-in"
            data-aos-duration="500"
          >
            {darkMode ? (
              <Sun size={20} className="text-warning" />
            ) : (
              <Moon size={20} className="text-primary" />
            )}
          </button>
          
          {/* Notifications */}
          <div className="dropdown mx-2">
            <button 
              className="btn btn-link text-decoration-none position-relative" 
              type="button" 
              id="notificationsDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <Bell size={20} className="text-primary" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
                <span className="visually-hidden">unread notifications</span>
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationsDropdown">
              <li><h6 className="dropdown-header">Notifications</h6></li>
              <li><a className="dropdown-item" href="#">New team registration</a></li>
              <li><a className="dropdown-item" href="#">Schedule update</a></li>
              <li><a className="dropdown-item" href="#">New discipline report</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-primary" href="#">View all notifications</a></li>
            </ul>
          </div>
          
          {/* User profile */}
          <div className="dropdown">
            <button 
              className="btn btn-link text-decoration-none d-flex align-items-center" 
              type="button" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" 
                  style={{ width: '32px', height: '32px', color: 'white' }}>
                  JD
                </div>
                <span className="d-none d-md-block">John Doe</span>
                <ChevronDown size={16} className="ms-1" />
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li><a className="dropdown-item" href="/profile">Profile</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-danger" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
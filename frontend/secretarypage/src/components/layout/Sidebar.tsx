import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Home, Users, Shield, UserCircle, Settings, LogOut, Code } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  return (
    <aside 
      className={`sidebar bg-white border-end d-flex flex-column transition-300 ${open ? 'show' : ''}`} 
      style={{ 
        borderColor: 'var(--border)', 
        backgroundColor: 'var(--card-bg)',
        zIndex: 1030 
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom" style={{ borderColor: 'var(--border)' }}>
        <div className="d-flex align-items-center">
          <Code size={24} className="text-primary me-2" />
          <h1 className="h5 mb-0 fw-bold text-primary">sports-SYNC</h1>
        </div>
        <button 
          className="btn-close d-md-none" 
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        ></button>
      </div>
      
      {/* Navigation */}
      <nav className="py-3">
        <div className="px-3 mb-2 text-uppercase small text-muted">Main</div>
        <ul className="nav flex-column">
          <li className="nav-item" data-aos="fade-right" data-aos-delay="100">
            <NavLink to="/" className={({isActive}) => 
              `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active-nav-link' : ''}`
            }>
              <Home size={18} className="me-2" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-right" data-aos-delay="150">
            <NavLink to="/schedule" className={({isActive}) => 
              `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active-nav-link' : ''}`
            }>
              <Calendar size={18} className="me-2" />
              <span>Schedule</span>
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-right" data-aos-delay="200">
            <NavLink to="/teams" className={({isActive}) => 
              `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active-nav-link' : ''}`
            }>
              <Users size={18} className="me-2" />
              <span>Teams</span>
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-right" data-aos-delay="250">
            <NavLink to="/discipline" className={({isActive}) => 
              `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active-nav-link' : ''}`
            }>
              <Shield size={18} className="me-2" />
              <span>Discipline</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="px-3 my-2 text-uppercase small text-muted">Personal</div>
        <ul className="nav flex-column">
          <li className="nav-item" data-aos="fade-right" data-aos-delay="300">
            <NavLink to="/profile" className={({isActive}) => 
              `nav-link px-3 py-2 d-flex align-items-center ${isActive ? 'active-nav-link' : ''}`
            }>
              <UserCircle size={18} className="me-2" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-right" data-aos-delay="350">
            <a href="#" className="nav-link px-3 py-2 d-flex align-items-center">
              <Settings size={18} className="me-2" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Logout at bottom */}
      <div className="mt-auto border-top p-3" style={{ borderColor: 'var(--border)' }}>
        <a href="#" className="btn btn-outline-danger d-flex align-items-center justify-content-center">
          <LogOut size={18} className="me-2" />
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
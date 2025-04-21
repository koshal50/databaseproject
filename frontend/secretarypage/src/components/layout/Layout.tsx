import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const { darkMode } = useTheme();
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`d-flex h-100 min-vh-100 ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 transition-300">
        <TopBar toggleSidebar={toggleSidebar} />
        
        <main className="flex-grow-1 content-wrapper">
          {children}
        </main>
        
        <footer className="py-4 text-center border-top" style={{ borderColor: 'var(--border)' }}>
          <p className="mb-0 text-muted">© 2025 sports-SYNC Teacher Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
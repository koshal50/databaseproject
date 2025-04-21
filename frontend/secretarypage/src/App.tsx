import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import TeamsPage from './pages/TeamsPage';
import DisciplinePage from './pages/DisciplinePage';
import ProfilePage from './pages/ProfilePage';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { darkMode } = useTheme();
  
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
    
    // Refresh AOS when components update
    window.addEventListener('load', () => {
      AOS.refresh();
    });
    
    return () => {
      window.removeEventListener('load', () => {
        AOS.refresh();
      });
    };
  }, []);
  
  useEffect(() => {
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/discipline" element={<DisciplinePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
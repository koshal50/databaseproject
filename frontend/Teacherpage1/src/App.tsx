import React, { useEffect } from 'react';
import TeacherPage from './pages/TeacherPage';
import { ThemeProvider } from './contexts/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <ThemeProvider>
      <TeacherPage />
    </ThemeProvider>
  );
}

export default App;
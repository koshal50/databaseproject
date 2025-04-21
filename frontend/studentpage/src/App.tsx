import React, { useState, useEffect } from 'react';
import StudentPage from './pages/StudentPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <StudentPage />
    </ThemeProvider>
  );
}

export default App;
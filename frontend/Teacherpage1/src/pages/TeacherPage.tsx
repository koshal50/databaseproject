import React from 'react';
import Navbar from '../components/Navbar';
import ScheduleManager from '../components/ScheduleManager';
import TeamSelector from '../components/TeamSelector';
import EquipmentManager from '../components/EquipmentManager';
import { useTheme } from '../contexts/ThemeContext';

const TeacherPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mt-6 mb-2 dark:text-white" data-aos="fade-down">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8" data-aos="fade-down" data-aos-delay="50">
            Manage schedules, teams, and equipment all in one place
          </p>
        </div>

        <div className="space-y-8">
          <ScheduleManager />
          <TeamSelector />
          <EquipmentManager />
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
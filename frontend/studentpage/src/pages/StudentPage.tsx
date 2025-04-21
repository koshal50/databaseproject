import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import SportsCards from '../components/SportsCards';
import UpcomingMatches from '../components/UpcomingMatches';
import Teams from '../components/Teams';
import RegistrationForm from '../components/RegistrationForm';
import ClassworkAttendanceForm from '../components/cw'; // Import the new component
import Footer from '../components/Footer';

const StudentPage: React.FC = () => {
  // Refresh AOS animations when component mounts
  useEffect(() => {
    // Import AOS dynamically to avoid SSR issues
    import('aos').then((AOS) => {
      AOS.refresh();
    });
  }, []);

  return (
    <div className="student-page">
      <Navbar />
      <div style={{ paddingTop: '56px' }}>
        <Header />
        <SportsCards />
        <UpcomingMatches />
        <Teams />
        <RegistrationForm />
        <ClassworkAttendanceForm /> {/* Render the new component */}
        <Footer />
      </div>
    </div>
  );
};

export default StudentPage;
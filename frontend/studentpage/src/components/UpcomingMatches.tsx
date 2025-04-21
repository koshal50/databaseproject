import React, { useContext } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { matches, sports } from '../data/sportsData';
import { ThemeContext } from '../context/ThemeContext';

const UpcomingMatches: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  
  // Sort matches by date
  const sortedMatches = [...matches].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get sport name from sportId
  const getSportName = (sportId: number) => {
    const sport = sports.find(s => s.id === sportId);
    return sport ? sport.name : 'Unknown Sport';
  };

  return (
    <section id="schedule" className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Upcoming Matches</h2>
          <p className="lead">Stay updated with the latest match schedules</p>
        </div>
        
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="table-responsive" data-aos="fade-up">
              <table className={`table ${theme === 'dark' ? 'table-dark' : 'table-light'} table-hover shadow-sm rounded overflow-hidden`}>
                <thead className={theme === 'dark' ? 'bg-primary text-white' : 'bg-primary text-white'}>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Sport</th>
                    <th scope="col">Match</th>
                    <th scope="col">Time</th>
                    <th scope="col">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMatches.map((match, index) => (
                    <tr key={match.id} data-aos="fade-up" data-aos-delay={index * 50}>
                      <td>{formatDate(match.date)}</td>
                      <td>{getSportName(match.sportId)}</td>
                      <td>
                        <span className="fw-bold">{match.homeTeam}</span> vs. {match.awayTeam}
                      </td>
                      <td>
                        <Clock size={14} className="me-1" />
                        {match.time}
                      </td>
                      <td>
                        <MapPin size={14} className="me-1" />
                        {match.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-4" data-aos="fade-up" data-aos-delay="200">
              <button className="btn btn-outline-primary px-4">
                View Full Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
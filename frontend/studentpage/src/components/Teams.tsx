import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { teams, sports } from '../data/sportsData';

const Teams: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  
  const getSportName = (sportId: number) => {
    const sport = sports.find(s => s.id === sportId);
    return sport ? sport.name : 'Unknown Sport';
  };

  return (
    <section id="teams" className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Teams</h2>
          <p className="lead">Meet our sports teams and members</p>
        </div>
        
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="list-group" data-aos="fade-right">
              {teams.map(team => (
                <button
                  key={team.id}
                  type="button"
                  className={`list-group-item list-group-item-action d-flex align-items-center ${
                    activeTeam.id === team.id ? 'active' : ''
                  } ${theme === 'dark' && activeTeam.id !== team.id ? 'bg-dark text-white border-secondary' : ''}`}
                  onClick={() => setActiveTeam(team)}
                >
                  <img 
                    src={team.image} 
                    alt={team.name} 
                    className="rounded-circle me-3"
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h6 className="mb-0">{team.name}</h6>
                    <small>{getSportName(team.sportId)}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-md-8" data-aos="fade-left">
            <div className={`card shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{activeTeam.name}</h5>
                <small>{getSportName(activeTeam.sportId)}</small>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  {activeTeam.members.map((member, index) => (
                    <div className="col-sm-6 col-md-4" key={member.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                      <div className={`card h-100 ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
                        <img 
                          src={member.image} 
                          className="card-img-top" 
                          alt={member.name}
                          style={{ height: '150px', objectFit: 'cover' }} 
                        />
                        <div className="card-body text-center">
                          <h6 className="card-title mb-1">{member.name}</h6>
                          <p className="card-text small">{member.position}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teams;
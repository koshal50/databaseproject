import React, { useState, useContext } from 'react';
import { Heart, Calendar, Users } from 'lucide-react';
import { Sport, sports as initialSports } from '../data/sportsData';
import { ThemeContext } from '../context/ThemeContext';

const SportsCards: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>(initialSports);
  const { theme } = useContext(ThemeContext);
  
  const toggleFollow = (id: number) => {
    setSports(sports.map(sport => 
      sport.id === id ? { ...sport, followed: !sport.followed } : sport
    ));
  };

  return (
    <section id="sports" className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Sports Events</h2>
          <p className="lead">Browse and follow your favorite sports</p>
        </div>
        
        <div className="row g-4">
          {sports.map((sport, index) => (
            <div 
              className="col-md-6 col-lg-4" 
              key={sport.id}
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className={`card h-100 border-0 shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(-10px)';
                  target.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                }}
              >
                <div className="position-relative">
                  <img 
                    src={sport.image} 
                    className="card-img-top" 
                    alt={sport.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <button 
                    className={`btn position-absolute top-0 end-0 m-2 rounded-circle ${sport.followed ? 'btn-primary' : 'btn-outline-light'}`}
                    onClick={() => toggleFollow(sport.id)}
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Heart size={20} fill={sport.followed ? 'white' : 'none'} />
                  </button>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{sport.name}</h5>
                  <p className="card-text">{sport.description}</p>
                </div>
                <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                  <a href="#schedule" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                    <Calendar size={16} /> Schedule
                  </a>
                  <a href="#teams" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                    <Users size={16} /> Teams
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsCards;
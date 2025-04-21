import React from 'react';
import { Users, Award, Clock } from 'lucide-react';

const teamData = [
  {
    id: 1,
    name: 'Junior Boys Soccer',
    members: 18,
    attendance: 95,
    achievements: 2,
    nextEvent: 'Practice - Tomorrow, 3:30 PM'
  },
  {
    id: 2, 
    name: 'Senior Girls Basketball',
    members: 12,
    attendance: 88,
    achievements: 3,
    nextEvent: 'Tournament - In 2 days'
  },
  {
    id: 3,
    name: 'Swim Team',
    members: 15,
    attendance: 92,
    achievements: 5,
    nextEvent: 'Meet - In 3 days'
  },
  {
    id: 4,
    name: 'Track & Field',
    members: 24,
    attendance: 85,
    achievements: 1,
    nextEvent: 'Practice - In 4 days'
  }
];

const TeamStatistics: React.FC = () => {
  return (
    <div className="team-statistics">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Team</th>
              <th>Members</th>
              <th>Attendance</th>
              <th>Achievements</th>
              <th>Next Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamData.map((team, index) => (
              <tr key={team.id} data-aos="fade-up" data-aos-delay={index * 50}>
                <td className="fw-medium">{team.name}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Users size={16} className="me-1 text-primary" />
                    <span>{team.members}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                      <div 
                        className={`progress-bar ${team.attendance >= 90 ? 'bg-success' : team.attendance >= 75 ? 'bg-warning' : 'bg-danger'}`} 
                        role="progressbar" 
                        style={{ width: `${team.attendance}%` }}
                        aria-valuenow={team.attendance} 
                        aria-valuemin={0} 
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <span className="small">{team.attendance}%</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Award size={16} className="me-1 text-warning" />
                    <span>{team.achievements}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Clock size={16} className="me-1 text-secondary" />
                    <span>{team.nextEvent}</span>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <button className="btn btn-sm btn-outline-primary me-1">View</button>
                    <button className="btn btn-sm btn-outline-secondary">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStatistics;
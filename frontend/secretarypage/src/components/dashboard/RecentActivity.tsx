import React from 'react';
import { Calendar, Users, Shield, Award, Clock } from 'lucide-react';

// Sample activity data
const activityData = [
  {
    id: 1,
    type: 'schedule',
    title: 'New event created',
    description: 'Basketball Tournament added to schedule',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'team',
    title: 'New team member',
    description: 'Sarah Johnson joined Junior Girls Soccer',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'discipline',
    title: 'Discipline case resolved',
    description: 'Case #142 - Unsportsmanlike conduct',
    time: 'Yesterday'
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Team achievement',
    description: 'Swimming team won regional competition',
    time: '2 days ago'
  },
  {
    id: 5,
    type: 'schedule',
    title: 'Event cancelled',
    description: 'Track practice on Friday cancelled',
    time: '3 days ago'
  }
];

const RecentActivity: React.FC = () => {
  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'schedule':
        return { icon: Calendar, color: 'text-primary' };
      case 'team':
        return { icon: Users, color: 'text-success' };
      case 'discipline':
        return { icon: Shield, color: 'text-warning' };
      case 'achievement':
        return { icon: Award, color: 'text-info' };
      default:
        return { icon: Clock, color: 'text-secondary' };
    }
  };

  return (
    <div className="activity-feed">
      <ul className="list-group list-group-flush">
        {activityData.map((activity, index) => {
          const { icon: Icon, color } = getActivityIcon(activity.type);
          
          return (
            <li 
              key={activity.id} 
              className="list-group-item border-bottom"
              data-aos="fade-left"
              data-aos-delay={index * 50}
            >
              <div className="d-flex">
                <div className={`rounded-circle p-2 me-3 ${color} bg-opacity-10`} style={{ backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)' }}>
                  <Icon size={18} className={color} />
                </div>
                
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>{activity.title}</strong>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                  <p className="mb-0 small">{activity.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivity;
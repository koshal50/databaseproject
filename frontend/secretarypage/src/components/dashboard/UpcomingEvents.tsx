import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Edit, Trash } from 'lucide-react';

// Sample events data
const eventsData = [
  {
    id: 1,
    title: 'Soccer Practice',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
    time: '3:30 PM - 5:00 PM',
    location: 'Main Field',
    type: 'practice',
    team: 'Junior Boys Soccer'
  },
  {
    id: 2,
    title: 'Basketball Tournament',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    time: '9:00 AM - 2:00 PM',
    location: 'Sports Hall',
    type: 'tournament',
    team: 'Senior Girls Basketball'
  },
  {
    id: 3,
    title: 'Swimming Meet',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    time: '4:00 PM - 6:00 PM',
    location: 'Aquatic Center',
    type: 'competition',
    team: 'Swim Team'
  },
  {
    id: 4,
    title: 'Track & Field Training',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
    time: '3:30 PM - 5:00 PM',
    location: 'Athletics Track',
    type: 'practice',
    team: 'Track & Field'
  },
  {
    id: 5,
    title: 'Table Tennis Club',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    time: '12:30 PM - 1:30 PM',
    location: 'Gym Annex',
    type: 'club',
    team: 'Table Tennis Club'
  }
];

const UpcomingEvents: React.FC = () => {
  const [events] = useState(eventsData);
  
  // Function to get the appropriate styles based on event type
  const getEventStyles = (type: string) => {
    switch(type) {
      case 'practice':
        return { bgColor: 'bg-primary bg-opacity-10', textColor: 'text-primary', icon: CalendarIcon };
      case 'tournament':
        return { bgColor: 'bg-warning bg-opacity-10', textColor: 'text-warning', icon: CalendarIcon };
      case 'competition':
        return { bgColor: 'bg-danger bg-opacity-10', textColor: 'text-danger', icon: CalendarIcon };
      case 'club':
        return { bgColor: 'bg-success bg-opacity-10', textColor: 'text-success', icon: CalendarIcon };
      default:
        return { bgColor: 'bg-secondary bg-opacity-10', textColor: 'text-secondary', icon: CalendarIcon };
    }
  };

  return (
    <div className="upcoming-events">
      {events.map((event, index) => {
        const { bgColor, textColor, icon: Icon } = getEventStyles(event.type);
        
        return (
          <div 
            key={event.id}
            className={`event-card p-3 mb-3 rounded ${bgColor} card-hover-effect`}
            data-aos="fade-up" 
            data-aos-delay={index * 50}
          >
            <div className="d-flex align-items-start">
              <div className={`rounded-circle p-2 me-3 ${bgColor}`}>
                <Icon size={24} className={textColor} />
              </div>
              
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h5 className="mb-0">{event.title}</h5>
                  <span className="badge bg-light text-dark">{event.team}</span>
                </div>
                
                <div className="small mb-2">
                  <div className="d-flex align-items-center mb-1">
                    <CalendarIcon size={16} className="me-2 text-muted" />
                    <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <Clock size={16} className="me-2 text-muted" />
                    <span>{event.time}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <MapPin size={16} className="me-2 text-muted" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="d-flex">
                  <button className="btn btn-sm btn-outline-secondary me-2">
                    <Edit size={14} className="me-1" />
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <Trash size={14} className="me-1" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingEvents;
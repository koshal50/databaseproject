import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Sample event data
const eventsData = [
  {
    id: 1,
    title: 'Soccer Practice',
    date: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
    time: '3:30 PM - 5:00 PM',
    location: 'Main Field',
    type: 'practice',
    team: 'Junior Boys Soccer',
    description: 'Regular practice session focusing on passing drills and defensive strategies.'
  },
  {
    id: 2,
    title: 'Basketball Tournament',
    date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    time: '9:00 AM - 2:00 PM',
    location: 'Sports Hall',
    type: 'tournament',
    team: 'Senior Girls Basketball',
    description: 'Regional tournament with 8 participating schools.'
  },
  {
    id: 3,
    title: 'Swimming Meet',
    date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    time: '4:00 PM - 6:00 PM',
    location: 'Aquatic Center',
    type: 'competition',
    team: 'Swim Team',
    description: 'Competitive meet against rival schools in the district.'
  },
  {
    id: 4,
    title: 'Track & Field Training',
    date: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000),
    time: '3:30 PM - 5:00 PM',
    location: 'Athletics Track',
    type: 'practice',
    team: 'Track & Field',
    description: 'Focus on sprints and relay handovers.'
  },
  {
    id: 5,
    title: 'Table Tennis Club',
    date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
    time: '12:30 PM - 1:30 PM',
    location: 'Gym Annex',
    type: 'club',
    team: 'Table Tennis Club',
    description: 'Weekly club meeting for all skill levels.'
  }
];

const SchedulePage: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<string>('all');

  const handleDateChange = (value: Value) => {
    setDate(value);
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  // Filter events based on selected date and filter type
  const filteredEvents = eventsData.filter(event => {
    const sameDay = event.date.toDateString() === (selectedDate as Date).toDateString();
    return (filterType === 'all' || event.type === filterType) && sameDay;
  });

  // Function to get badge color based on event type
  const getEventBadgeColor = (type: string) => {
    switch(type) {
      case 'practice': return 'bg-primary';
      case 'tournament': return 'bg-warning';
      case 'competition': return 'bg-danger';
      case 'club': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  // Function to get tile content for calendar highlighting
  const getTileContent = ({ date, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const eventForDate = eventsData.find(event => 
        event.date.getDate() === date.getDate() && 
        event.date.getMonth() === date.getMonth() && 
        event.date.getFullYear() === date.getFullYear()
      );
      
      if (eventForDate) {
        return (
          <div className="position-absolute bottom-0 start-50 translate-middle-x" style={{ height: '4px', width: '75%' }}>
            <div className={`${getEventBadgeColor(eventForDate.type)} rounded-pill w-100 h-100`}></div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="schedule-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" data-aos="fade-right">Schedule Management</h1>
        <button className="btn btn-primary d-flex align-items-center" data-aos="fade-left" data-bs-toggle="modal" data-bs-target="#addEventModal">
          <Plus size={18} className="me-1" />
          Add Event
        </button>
      </div>
      
      <div className="row g-4">
        {/* Calendar Column */}
        <div className="col-lg-4 col-md-5" data-aos="fade-right">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Calendar</h5>
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-secondary">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="btn btn-sm btn-outline-secondary">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              
              <div className="calendar-wrapper" data-aos="fade-up">
                <Calendar 
                  onChange={handleDateChange} 
                  value={date}
                  tileContent={getTileContent}
                  className="border-0 w-100"
                />
              </div>
              
              <div className="mt-4">
                <h6 className="mb-2">Filter Events</h6>
                <div className="d-flex flex-wrap gap-2">
                  <button 
                    className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`btn btn-sm ${filterType === 'practice' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilterType('practice')}
                  >
                    Practice
                  </button>
                  <button 
                    className={`btn btn-sm ${filterType === 'tournament' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilterType('tournament')}
                  >
                    Tournament
                  </button>
                  <button 
                    className={`btn btn-sm ${filterType === 'competition' ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => setFilterType('competition')}
                  >
                    Competition
                  </button>
                  <button 
                    className={`btn btn-sm ${filterType === 'club' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setFilterType('club')}
                  >
                    Club
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events List Column */}
        <div className="col-lg-8 col-md-7" data-aos="fade-left">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h5>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <Filter size={16} className="me-1" />
                    Filter
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="filterDropdown">
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterType('all')}>All Events</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterType('practice')}>Practices</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterType('tournament')}>Tournaments</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterType('competition')}>Competitions</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => setFilterType('club')}>Clubs</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              {filteredEvents.length > 0 ? (
                <div className="events-list">
                  {filteredEvents.map((event, index) => (
                    <div 
                      key={event.id} 
                      className="card border mb-3 card-hover-effect" 
                      data-aos="fade-up" 
                      data-aos-delay={index * 50}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h5 className="card-title mb-1">{event.title}</h5>
                            <div className="d-flex align-items-center mb-2">
                              <span className={`badge ${getEventBadgeColor(event.type)} me-2`}>{event.type}</span>
                              <span className="badge bg-secondary">{event.team}</span>
                            </div>
                          </div>
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary" type="button" id={`eventOptions${event.id}`} data-bs-toggle="dropdown" aria-expanded="false">
                              Options
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby={`eventOptions${event.id}`}>
                              <li><a className="dropdown-item" href="#">Edit</a></li>
                              <li><a className="dropdown-item" href="#">Reschedule</a></li>
                              <li><hr className="dropdown-divider" /></li>
                              <li><a className="dropdown-item text-danger" href="#">Cancel Event</a></li>
                            </ul>
                          </div>
                        </div>
                        
                        <p className="card-text mb-3">{event.description}</p>
                        
                        <div className="d-flex flex-wrap gap-3 text-muted small">
                          <div className="d-flex align-items-center">
                            <CalendarIcon size={14} className="me-1" />
                            <span>{event.time}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <CalendarIcon size={14} className="me-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <CalendarIcon size={48} className="text-muted mb-3" />
                  <h5>No events scheduled</h5>
                  <p className="text-muted">There are no events scheduled for this date.</p>
                  <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEventModal">
                    <Plus size={18} className="me-1" />
                    Add Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Event Modal */}
      <div className="modal fade" id="addEventModal" tabIndex={-1} aria-labelledby="addEventModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEventModalLabel">Add New Event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row g-3">
                  <div className="col-md-12">
                    <label htmlFor="eventTitle" className="form-label">Event Title</label>
                    <input type="text" className="form-control" id="eventTitle" placeholder="Enter event title" />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="eventDate" className="form-label">Date</label>
                    <input type="date" className="form-control" id="eventDate" />
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="eventTime" className="form-label">Time</label>
                    <div className="row g-2">
                      <div className="col">
                        <input type="time" className="form-control" id="eventStartTime" />
                      </div>
                      <div className="col-auto">
                        <span className="form-text pt-1">to</span>
                      </div>
                      <div className="col">
                        <input type="time" className="form-control" id="eventEndTime" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="eventType" className="form-label">Event Type</label>
                    <select className="form-select" id="eventType">
                      <option value="">Select type</option>
                      <option value="practice">Practice</option>
                      <option value="tournament">Tournament</option>
                      <option value="competition">Competition</option>
                      <option value="club">Club</option>
                    </select>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="eventTeam" className="form-label">Team</label>
                    <select className="form-select" id="eventTeam">
                      <option value="">Select team</option>
                      <option value="Junior Boys Soccer">Junior Boys Soccer</option>
                      <option value="Senior Girls Basketball">Senior Girls Basketball</option>
                      <option value="Swim Team">Swim Team</option>
                      <option value="Track & Field">Track & Field</option>
                      <option value="Table Tennis Club">Table Tennis Club</option>
                    </select>
                  </div>
                  
                  <div className="col-md-12">
                    <label htmlFor="eventLocation" className="form-label">Location</label>
                    <input type="text" className="form-control" id="eventLocation" placeholder="Enter location" />
                  </div>
                  
                  <div className="col-md-12">
                    <label htmlFor="eventDescription" className="form-label">Description</label>
                    <textarea className="form-control" id="eventDescription" rows={3} placeholder="Enter event description"></textarea>
                  </div>
                  
                  <div className="col-md-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="notifyTeam" />
                      <label className="form-check-label" htmlFor="notifyTeam">
                        Notify team members
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save Event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
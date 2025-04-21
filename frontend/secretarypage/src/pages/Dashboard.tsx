import React from 'react';
import { Calendar, Users, Shield, Clock, Award, Bell } from 'lucide-react';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import TeamStatistics from '../components/dashboard/TeamStatistics';
import RecentActivity from '../components/dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" data-aos="fade-right">Welcome, John!</h1>
        <div className="d-flex align-items-center" data-aos="fade-left">
          <span className="text-muted me-2">Today:</span>
          <span className="fw-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
          <div className="card h-100 border-0 shadow-sm card-hover-effect">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                  <Calendar size={24} className="text-primary" />
                </div>
                <h5 className="card-title mb-0">Upcoming Events</h5>
              </div>
              <h3 className="mb-2">8</h3>
              <p className="card-text text-muted">
                3 events this week
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
          <div className="card h-100 border-0 shadow-sm card-hover-effect">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                  <Users size={24} className="text-success" />
                </div>
                <h5 className="card-title mb-0">Active Teams</h5>
              </div>
              <h3 className="mb-2">12</h3>
              <p className="card-text text-muted">
                3 new this month
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
          <div className="card h-100 border-0 shadow-sm card-hover-effect">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3">
                  <Shield size={24} className="text-warning" />
                </div>
                <h5 className="card-title mb-0">Discipline Cases</h5>
              </div>
              <h3 className="mb-2">5</h3>
              <p className="card-text text-muted">
                2 pending review
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
          <div className="card h-100 border-0 shadow-sm card-hover-effect">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-info bg-opacity-10 p-2 me-3">
                  <Clock size={24} className="text-info" />
                </div>
                <h5 className="card-title mb-0">Teaching Hours</h5>
              </div>
              <h3 className="mb-2">24h</h3>
              <p className="card-text text-muted">
                This week
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Row */}
      <div className="row g-4">
        {/* Calendar Events */}
        <div className="col-lg-8" data-aos="fade-up">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Upcoming Events</h5>
              <a href="/schedule" className="btn btn-sm btn-primary">View All</a>
            </div>
            <div className="card-body">
              <UpcomingEvents />
            </div>
          </div>
        </div>
        
        {/* Activity Feed */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Activity</h5>
              <button className="btn btn-sm btn-outline-primary">View All</button>
            </div>
            <div className="card-body p-0">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Content Row */}
      <div className="row g-4 mt-4">
        {/* Team Statistics */}
        <div className="col-lg-8" data-aos="fade-up">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Team Statistics</h5>
              <a href="/teams" className="btn btn-sm btn-primary">Manage Teams</a>
            </div>
            <div className="card-body">
              <TeamStatistics />
            </div>
          </div>
        </div>
        
        {/* Reminders/Announcements */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Announcements</h5>
              <button className="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#newAnnouncementModal">
                <Bell size={16} className="me-1" />
                New
              </button>
            </div>
            <div className="card-body">
              <div className="announcement p-3 mb-3 bg-primary bg-opacity-10 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <strong>Term 2 Sports Registration</strong>
                  <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-0 small">Reminder to all students that term 2 sports registration closes on Friday.</p>
              </div>
              
              <div className="announcement p-3 mb-3 bg-warning bg-opacity-10 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <strong>Field Maintenance</strong>
                  <small className="text-muted">1 week ago</small>
                </div>
                <p className="mb-0 small">The main field will be closed next Tuesday for maintenance.</p>
              </div>
              
              <div className="announcement p-3 bg-success bg-opacity-10 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <strong>Regional Competition</strong>
                  <small className="text-muted">2 weeks ago</small>
                </div>
                <p className="mb-0 small">Congratulations to our swim team for winning the regional championship!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <div className="modal fade" id="newAnnouncementModal" tabIndex={-1} aria-labelledby="newAnnouncementModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newAnnouncementModalLabel">Create New Announcement</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="announcementTitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="announcementTitle" />
                </div>
                <div className="mb-3">
                  <label htmlFor="announcementContent" className="form-label">Content</label>
                  <textarea className="form-control" id="announcementContent" rows={3}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="announcementPriority" className="form-label">Priority</label>
                  <select className="form-select" id="announcementPriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
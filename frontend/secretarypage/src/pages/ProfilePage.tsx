import React from 'react';
import { User, Mail, Phone, School, Calendar, Shield, Award, Edit } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <h1 className="h3 mb-4" data-aos="fade-right">My Profile</h1>
      
      <div className="row g-4">
        {/* Profile Information */}
        <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <div className="position-relative mx-auto mb-3" style={{ width: '120px', height: '120px' }}>
                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto" 
                  style={{ width: '120px', height: '120px', fontSize: '48px', color: 'white' }}>
                  JD
                </div>
                <button className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0" style={{ padding: '.25rem .5rem' }}>
                  <Edit size={14} />
                </button>
              </div>
              <h4 className="mb-1">John Doe</h4>
              <p className="text-muted mb-3">Physical Education Teacher</p>
              
              <div className="d-flex flex-column gap-2 text-start mt-4">
                <div className="d-flex align-items-center">
                  <Mail size={18} className="text-muted me-3" />
                  <span>john.doe@school.edu</span>
                </div>
                <div className="d-flex align-items-center">
                  <Phone size={18} className="text-muted me-3" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center">
                  <School size={18} className="text-muted me-3" />
                  <span>Westside High School</span>
                </div>
                <div className="d-flex align-items-center">
                  <Calendar size={18} className="text-muted me-3" />
                  <span>Joined September 2022</span>
                </div>
              </div>
              
              <div className="mt-4">
                <button className="btn btn-outline-primary w-100">Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Stats */}
        <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                      <Shield size={24} className="text-primary" />
                    </div>
                    <h6 className="card-title mb-0">Active Teams</h6>
                  </div>
                  <h3 className="mb-2">5</h3>
                  <p className="card-text text-muted small">Currently coaching or assisting</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                      <Calendar size={24} className="text-success" />
                    </div>
                    <h6 className="card-title mb-0">Events</h6>
                  </div>
                  <h3 className="mb-2">12</h3>
                  <p className="card-text text-muted small">Scheduled in the next 30 days</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3">
                      <Award size={24} className="text-warning" />
                    </div>
                    <h6 className="card-title mb-0">Achievements</h6>
                  </div>
                  <h3 className="mb-2">8</h3>
                  <p className="card-text text-muted small">Team achievements this year</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="card border-0 shadow-sm" data-aos="fade-up" data-aos-delay="300">
            <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-bottom">
                  <div className="d-flex">
                    <div className="rounded-circle p-2 me-3 text-primary bg-primary bg-opacity-10">
                      <Calendar size={18} className="text-primary" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong>Created new event</strong>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                      <p className="mb-0 small">Added Basketball Tournament to schedule</p>
                    </div>
                  </div>
                </div>
                
                <div className="list-group-item border-bottom">
                  <div className="d-flex">
                    <div className="rounded-circle p-2 me-3 text-success bg-success bg-opacity-10">
                      <User size={18} className="text-success" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong>Updated team roster</strong>
                        <small className="text-muted">Yesterday</small>
                      </div>
                      <p className="mb-0 small">Added 3 new students to Junior Boys Soccer</p>
                    </div>
                  </div>
                </div>
                
                <div className="list-group-item border-bottom">
                  <div className="d-flex">
                    <div className="rounded-circle p-2 me-3 text-warning bg-warning bg-opacity-10">
                      <Shield size={18} className="text-warning" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong>Resolved discipline case</strong>
                        <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-0 small">Case #142 - Unsportsmanlike conduct</p>
                    </div>
                  </div>
                </div>
                
                <div className="list-group-item">
                  <div className="d-flex">
                    <div className="rounded-circle p-2 me-3 text-info bg-info bg-opacity-10">
                      <Award size={18} className="text-info" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong>Team achievement</strong>
                        <small className="text-muted">1 week ago</small>
                      </div>
                      <p className="mb-0 small">Swimming team won regional competition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
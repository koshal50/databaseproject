import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, FileText, Eye } from 'lucide-react';

const DisciplinePage: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  // Sample approval requests data
  const approvalRequests = [
    {
      id: 1,
      student: 'Michael Brown',
      class: 'Physical Education',
      date: new Date(),
      type: 'Make-up Class',
      reason: 'Missed class due to doctor appointment',
      status: 'pending',
      form: {
        parentName: 'Robert Brown',
        contactNumber: '(555) 123-4567',
        missedDate: '2025-03-10',
        doctorNote: true,
        additionalInfo: 'Doctor\'s appointment was scheduled for annual check-up.'
      }
    },
    {
      id: 2,
      student: 'Jessica Williams',
      class: 'Physical Education',
      date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      type: 'Alternative Assignment',
      reason: 'Temporary injury - doctor\'s note provided',
      status: 'approved',
      form: {
        parentName: 'Sarah Williams',
        contactNumber: '(555) 234-5678',
        injuryType: 'Sprained ankle',
        recoveryPeriod: '2 weeks',
        doctorNote: true,
        additionalInfo: 'Physical therapy sessions scheduled twice a week.'
      }
    },
    {
      id: 3,
      student: 'David Jones',
      class: 'Physical Education',
      date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
      type: 'Make-up Class',
      reason: 'School event conflict',
      status: 'rejected',
      form: {
        parentName: 'Michael Jones',
        contactNumber: '(555) 345-6789',
        eventName: 'Science Fair',
        eventDate: '2025-03-08',
        eventTime: '2:00 PM - 4:00 PM',
        additionalInfo: 'Representing school in regional science fair competition.'
      }
    }
  ];

  return (
    <div className="discipline-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" data-aos="fade-right">Classwork Approval Requests</h1>
      </div>

      <div className="row g-4">
        {/* Stats Cards */}
        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-warning bg-opacity-10 p-2 me-3">
                  <Clock size={24} className="text-warning" />
                </div>
                <h5 className="card-title mb-0">Pending</h5>
              </div>
              <h3 className="mb-2">1</h3>
              <p className="card-text text-muted">Awaiting review</p>
            </div>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-2 me-3">
                  <CheckCircle size={24} className="text-success" />
                </div>
                <h5 className="card-title mb-0">Approved</h5>
              </div>
              <h3 className="mb-2">1</h3>
              <p className="card-text text-muted">Last 30 days</p>
            </div>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-danger bg-opacity-10 p-2 me-3">
                  <XCircle size={24} className="text-danger" />
                </div>
                <h5 className="card-title mb-0">Rejected</h5>
              </div>
              <h3 className="mb-2">1</h3>
              <p className="card-text text-muted">Last 30 days</p>
            </div>
          </div>
        </div>

        {/* Approval Requests List */}
        <div className="col-12" data-aos="fade-up">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalRequests.map((request, index) => (
                      <tr key={request.id} data-aos="fade-up" data-aos-delay={index * 50}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                              <FileText size={16} className="text-primary" />
                            </div>
                            <div>
                              <div className="fw-medium">{request.student}</div>
                              <small className="text-muted">{request.class}</small>
                            </div>
                          </div>
                        </td>
                        <td>{request.type}</td>
                        <td>{request.date.toLocaleDateString()}</td>
                        <td>{request.reason}</td>
                        <td>
                          <span className={`badge ${
                            request.status === 'pending' ? 'bg-warning' :
                            request.status === 'approved' ? 'bg-success' :
                            'bg-danger'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group">
                            <button 
                              className="btn btn-sm btn-outline-secondary me-1"
                              onClick={() => setSelectedRequest(request)}
                              data-bs-toggle="modal"
                              data-bs-target="#viewFormModal"
                            >
                              <Eye size={14} className="me-1" />
                              View Form
                            </button>
                            {request.status === 'pending' && (
                              <>
                                <button className="btn btn-sm btn-success me-1">
                                  <CheckCircle size={14} className="me-1" />
                                  Approve
                                </button>
                                <button className="btn btn-sm btn-danger">
                                  <XCircle size={14} className="me-1" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Form Modal */}
      <div className="modal fade" id="viewFormModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Request Form Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedRequest && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Student Name</label>
                    <p>{selectedRequest.student}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Class</label>
                    <p>{selectedRequest.class}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Parent/Guardian Name</label>
                    <p>{selectedRequest.form.parentName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-medium">Contact Number</label>
                    <p>{selectedRequest.form.contactNumber}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Request Type</label>
                    <p>{selectedRequest.type}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-medium">Reason</label>
                    <p>{selectedRequest.reason}</p>
                  </div>
                  {selectedRequest.form.doctorNote && (
                    <div className="col-12">
                      <div className="alert alert-info">
                        <CheckCircle size={16} className="me-2" />
                        Doctor's note provided
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label fw-medium">Additional Information</label>
                    <p>{selectedRequest.form.additionalInfo}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {selectedRequest?.status === 'pending' && (
                <div className="btn-group">
                  <button type="button" className="btn btn-success me-2">
                    <CheckCircle size={14} className="me-1" />
                    Approve Request
                  </button>
                  <button type="button" className="btn btn-danger">
                    <XCircle size={14} className="me-1" />
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisciplinePage;
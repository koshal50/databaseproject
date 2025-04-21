'use client'
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { sports } from '../data/sportsData';

interface AttendanceFormData {
  sportId: string;
  date: string;
  time: string;
  venue: string;
  dueDate: string;
}

const ClassworkAttendanceForm: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState<AttendanceFormData>({
    sportId: '',
    date: '',
    time: '',
    venue: '',
    dueDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/forms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // adjust if using different auth
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');
      setShowSuccess(true);
      setFormData({ sportId: '', date: '', time: '', venue: '', dueDate: '' });

      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert('Something went wrong while submitting the form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <section id="Cw" className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Classwork Attendance Form</h2>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className={`card shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
              <div className="card-body p-4">
                {showSuccess ? (
                  <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Submitted!</h4>
                    <p>Attendance information has been recorded successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="sportId" className="form-label">Sport</label>
                      <select
                        className="form-select"
                        id="sportId"
                        name="sportId"
                        value={formData.sportId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose a sport...</option>
                        {sports.map(sport => (
                          <option key={sport.id} value={sport.id}>
                            {sport.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="time" className="form-label">Time</label>
                      <input
                        type="time"
                        className="form-control"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="venue" className="form-label">Venue</label>
                      <input
                        type="text"
                        className="form-control"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dueDate" className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassworkAttendanceForm;

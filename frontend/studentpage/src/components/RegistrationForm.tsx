import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { sports } from '../data/sportsData';

interface FormData {
  fullName: string;
  email: string;
  studentId: string;
  sportId: string;
  experience: string;
  agreement: boolean;
}

const RegistrationForm: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    studentId: '',
    sportId: '',
    experience: '',
    agreement: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        studentId: '',
        sportId: '',
        experience: '',
        agreement: false,
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <section id="register" className={`py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h2 className="fw-bold">Register for Sports</h2>
          <p className="lead">Join our sports teams and activities</p>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6" data-aos="fade-up">
            <div className={`card shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
              <div className="card-body p-4">
                {showSuccess ? (
                  <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Registration Successful!</h4>
                    <p>Thank you for registering. We'll contact you soon with more details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="studentId" className="form-label">Student ID</label>
                      <input
                        type="text"
                        className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="sportId" className="form-label">Select Sport</label>
                      <select
                        className={`form-select ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
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
                      <label htmlFor="experience" className="form-label">Experience Level</label>
                      <textarea
                        className={`form-control ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
                        id="experience"
                        name="experience"
                        rows={3}
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="Tell us about your experience with this sport..."
                      ></textarea>
                    </div>
                    
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreement"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="agreement">
                        I agree to the terms and conditions
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </span>
                      ) : (
                        'Register Now'
                      )}
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

export default RegistrationForm;
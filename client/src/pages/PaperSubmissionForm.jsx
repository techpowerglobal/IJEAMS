import React, { useState } from 'react';
import { Upload, FileText, User, PenTool, FileCheck } from 'lucide-react';
import './PaperSubmissionForm.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const PaperSubmissionForm = () => {
  const [formData, setFormData] = useState({
    authorName: '',
    institute: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    title: '',
    abstract: '',
    manuscript: null
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          manuscript: 'File size must be less than 5MB'
        }));
        return;
      }
      
      const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type) && !file.name.match(/\.(doc|docx)$/i)) {
        setErrors(prev => ({
          ...prev,
          manuscript: 'Only .doc and .docx files are allowed'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        manuscript: file
      }));
      
      if (errors.manuscript) {
        setErrors(prev => ({
          ...prev,
          manuscript: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['authorName', 'institute', 'phone', 'email', 'address', 'country', 'title', 'abstract'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (!formData.manuscript) {
      newErrors.manuscript = 'Please upload your manuscript';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Paper submitted successfully!');
      console.log('Form Data:', formData);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="academic-portal">
        <div className="submission-container">
          <div className="portal-header">
            <div className="header-decoration">
              <div className="academic-icon">
                <FileText size={28} />
              </div>
            </div>
            <h1 className="portal-title">Submit Research Paper</h1>
            <p className="portal-description">
              Submit your manuscript for academic review and publication
            </p>
          </div>

          <div className="submission-form">
            {/* ===== Author Info ===== */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <User size={18} />
                </div>
                <h2 className="section-title">Author Information</h2>
              </div>
              
              <div className="form-grid">
                <div className="input-group">
                  <label className="form-label">
                    Author Name <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.authorName ? 'input-error' : ''}`}
                    placeholder="Dr. John Smith"
                  />
                  {errors.authorName && <span className="error-message">{errors.authorName}</span>}
                </div>
                
                <div className="input-group">
                  <label className="form-label">
                    Institute / Organization <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleInputChange}
                    className={`form-input ${errors.institute ? 'input-error' : ''}`}
                    placeholder="University of Science"
                  />
                  {errors.institute && <span className="error-message">{errors.institute}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label className="form-label">
                    Phone Number <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                
                <div className="input-group">
                  <label className="form-label">
                    Email Address <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="john.smith@university.edu"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label className="form-label">
                    Address <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`form-input ${errors.address ? 'input-error' : ''}`}
                    placeholder="123 University Ave, City, State"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="input-group">
                  <label className="form-label">
                    Country <span className="required-asterisk">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`form-input form-select ${errors.country ? 'input-error' : ''}`}
                  >
                    <option value="">Select your country</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="CN">China</option>
                    <option value="BR">Brazil</option>
                    <option value="OTHER">Other</option>
                  </select>
                  {errors.country && <span className="error-message">{errors.country}</span>}
                </div>
              </div>
            </div>

            {/* ===== Manuscript Details ===== */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <PenTool size={18} />
                </div>
                <h2 className="section-title">Manuscript Details</h2>
              </div>
              
              <div className="input-group">
                <label className="form-label">
                  Paper Title <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`form-input ${errors.title ? 'input-error' : ''}`}
                  placeholder="Enter the title of your research paper"
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="input-group">
                <label className="form-label">
                  Abstract <span className="required-asterisk">*</span>
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  className={`form-textarea ${errors.abstract ? 'input-error' : ''}`}
                  placeholder="Provide a comprehensive abstract of your research (250-300 words recommended)"
                  rows="8"
                />
                <div className="character-count">
                  {formData.abstract.length} characters
                </div>
                {errors.abstract && <span className="error-message">{errors.abstract}</span>}
              </div>
            </div>

            {/* ===== Upload Section ===== */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-icon">
                  <Upload size={18} />
                </div>
                <h2 className="section-title">Document Upload</h2>
              </div>
              
              <div className="input-group">
                <label className="form-label">
                  Upload Manuscript <span className="required-asterisk">*</span>
                </label>
                <div className={`upload-zone ${formData.manuscript ? 'upload-success' : ''} ${errors.manuscript ? 'upload-error' : ''}`}>
                  <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={handleFileChange}
                    className="file-input"
                    id="manuscript-upload"
                  />
                  <label htmlFor="manuscript-upload" className="upload-label">
                    {formData.manuscript ? (
                      <div className="upload-success-state">
                        <div className="success-icon">
                          <FileCheck size={32} />
                        </div>
                        <div className="file-info">
                          <span className="file-name">{formData.manuscript.name}</span>
                          <span className="file-size">
                            {(formData.manuscript.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                        <span className="change-file">Click to change file</span>
                      </div>
                    ) : (
                      <div className="upload-empty-state">
                        <div className="upload-icon">
                          <Upload size={32} />
                        </div>
                        <div className="upload-text">
                          <span className="upload-primary">Drop your manuscript here</span>
                          <span className="upload-secondary">or click to browse</span>
                        </div>
                        <div className="upload-requirements">
                          <span className="file-types">Accepted: .doc, .docx</span>
                          <span className="file-size">Maximum size: 5MB</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                {errors.manuscript && <span className="error-message">{errors.manuscript}</span>}
              </div>
            </div>

            {/* ===== Actions ===== */}
            <div className="form-actions">
              <button type="button" className="btn-secondary">
                Save Draft
              </button>
              <button type="submit" onClick={handleSubmit} className="btn-primary">
                <FileText size={18} />
                Submit Paper
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PaperSubmissionForm;

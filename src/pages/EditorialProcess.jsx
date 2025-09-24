import React from 'react';
import './EditorialProcess.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const EditorialProcess = () => {
  const processSteps = [
    {
      id: 1,
      title: "Plagiarism Check and Author Details Verification",
      description: "The manuscript undergoes a plagiarism check, and the authors' details are verified.",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Review Committee Evaluation",
      description: "The checked manuscript is then sent to the Review Committee for evaluation. The committee provides feedback and suggestions for necessary changes, labeled as Review comments.",
      icon: "👥"
    },
    {
      id: 3,
      title: "Author Revision",
      description: "The Review Comments are communicated to the authors, who are expected to make the necessary revisions within 5 working days.",
      icon: "✏️"
    },
    {
      id: 4,
      title: "Second Review",
      description: "After receiving the corrected manuscript, it undergoes another review by the Review Committee before being forwarded to the main Editor.",
      icon: "🔄"
    },
    {
      id: 5,
      title: "Editorial Decision",
      description: "The main Editor holds the sole discretion for selecting or rejecting the manuscript based on the feedback and revisions.",
      icon: "⚖️"
    },
    {
      id: 6,
      title: "Publication",
      description: "Upon approval by the main Editor, the manuscript is published on International Journal of Advanced Engineering and Management System website, and the authors are notified accordingly.",
      icon: "📚"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="aems-editorial-container">
      <div className="aems-editorial-wrapper">
        <div className="aems-editorial-header">
          <h1 className="aems-editorial-title">Editorial Process</h1>
          <p className="aems-editorial-subtitle">
            Every manuscript submitted to <strong>International Journal of Advanced Engineering and Management System</strong> follows the following process:
          </p>
        </div>
        
        <div className="aems-timeline-container">
          {processSteps.map((step, index) => (
            <div key={step.id} className="aems-timeline-item">
              <div className="aems-timeline-marker">
                <div className="aems-step-number">{step.id}</div>
              </div>
              <div className="aems-timeline-content">
                <div className="aems-step-card">
                  <div className="aems-step-header">
                    <span className="aems-step-icon">{step.icon}</span>
                    <h3 className="aems-step-title">{step.title}</h3>
                  </div>
                  <p className="aems-step-description">{step.description}</p>
                </div>
              </div>
              {index < processSteps.length - 1 && (
                <div className="aems-timeline-line"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="aems-editorial-footer">
          <div className="aems-notice-card">
            <h4 className="aems-notice-title">Important Notice</h4>
            <p className="aems-notice-text">
              Authors are expected to respond to review comments within <strong>5 working days</strong>. 
              The final decision rests with the main Editor based on the quality of revisions and overall manuscript merit.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default EditorialProcess;
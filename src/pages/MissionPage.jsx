import React from 'react';
import './MissionPage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const MissionPage = () => {
  return (
    <>
    <Navbar/>
    <div className="ijaems-mission-container">
      <div className="ijaems-hero-section">
        <div className="ijaems-background-pattern"></div>
        <div className="ijaems-content-wrapper">
          <header className="ijaems-header">
            <h1 className="ijaems-main-title">Our Mission</h1>
            <div className="ijaems-journal-name">
              International Journal of Advanced Engineering and Management System
            </div>
          </header>
          
          <div className="ijaems-mission-content">
            <div className="ijaems-mission-card">
              <div className="ijaems-card-icon">
                <svg className="ijaems-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="ijaems-card-content">
                <h2 className="ijaems-card-title">Global Research Community</h2>
                <p className="ijaems-card-text">
                  We are dedicated to fostering a vibrant community where researchers and students 
                  from around the globe can readily access and exchange ideas in the fields of Engineering.
                </p>
              </div>
            </div>

            <div className="ijaems-mission-card">
              <div className="ijaems-card-icon">
                <svg className="ijaems-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="ijaems-card-content">
                <h2 className="ijaems-card-title">Breaking Down Barriers</h2>
                <p className="ijaems-card-text">
                  Our mission is to break down barriers and facilitate seamless communication, 
                  ensuring that valuable insights and innovations can be shared and discussed among peers.
                </p>
              </div>
            </div>

            <div className="ijaems-mission-card">
              <div className="ijaems-card-icon">
                <svg className="ijaems-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12l2 2 4-4"/>
                </svg>
              </div>
              <div className="ijaems-card-content">
                <h2 className="ijaems-card-title">Bridging Divides</h2>
                <p className="ijaems-card-text">
                  Through our platform, we aim to bridge geographical and institutional divides, 
                  enabling collaboration and knowledge-sharing on a global scale.
                </p>
              </div>
            </div>

            <div className="ijaems-mission-card">
              <div className="ijaems-card-icon">
                <svg className="ijaems-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="ijaems-card-content">
                <h2 className="ijaems-card-title">Inclusive Environment</h2>
                <p className="ijaems-card-text">
                  By providing an inclusive environment for dialogue and exchange, we strive to 
                  accelerate progress and drive advancements in Engineering disciplines.
                </p>
              </div>
            </div>
          </div>

          <div className="ijaems-vision-statement">
            <div className="ijaems-vision-content">
              <h3 className="ijaems-vision-title">Driving Innovation Forward</h3>
              <p className="ijaems-vision-text">
                Together, we're building a future where engineering knowledge knows no boundaries, 
                where every researcher has a voice, and where collaborative innovation shapes tomorrow's solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default MissionPage;
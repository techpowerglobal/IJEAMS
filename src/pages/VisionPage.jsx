import React from 'react';
import './VisionPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VisionPage = () => {
  return (
    <>
    <Navbar/>
    <div className="vision-container-main">
      <div className="vision-wrapper-content">
        {/* Header Section */}
        <div className="vision-header-section">
          <div className="vision-title-container">
            <h1 className="vision-main-title">Our Vision</h1>
            <div className="vision-title-underline"></div>
          </div>
          <p className="vision-subtitle-text">
            Shaping the Future of Engineering Research and Innovation
          </p>
        </div>

        {/* Main Content Section */}
        <div className="vision-content-section">
          <div className="vision-journal-intro">
            <h2 className="vision-journal-name">
              International Journal of Advanced Engineering and Management System
            </h2>
          </div>

          <div className="vision-description-blocks">
            <div className="vision-block-primary">
              <div className="vision-icon-placeholder">
                <div className="vision-icon-circle">
                  <svg className="vision-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <div className="vision-block-content">
                <h3 className="vision-block-title">Global Community Building</h3>
                <p className="vision-block-text">
                  We are dedicated to fostering a vibrant community where researchers and students 
                  from around the globe can readily access and exchange ideas in the fields of Engineering.
                </p>
              </div>
            </div>

            <div className="vision-block-secondary">
              <div className="vision-icon-placeholder">
                <div className="vision-icon-circle">
                  <svg className="vision-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"></path>
                    <path d="M21 11h-4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"></path>
                    <path d="M7 11V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v7"></path>
                  </svg>
                </div>
              </div>
              <div className="vision-block-content">
                <h3 className="vision-block-title">Breaking Down Barriers</h3>
                <p className="vision-block-text">
                  Our mission is to break down barriers and facilitate seamless communication, 
                  ensuring that valuable insights and innovations can be shared and discussed among peers.
                </p>
              </div>
            </div>

            <div className="vision-block-tertiary">
              <div className="vision-icon-placeholder">
                <div className="vision-icon-circle">
                  <svg className="vision-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M2 12h20"></path>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
              </div>
              <div className="vision-block-content">
                <h3 className="vision-block-title">Global Collaboration</h3>
                <p className="vision-block-text">
                  Through our platform, we aim to bridge geographical and institutional divides, 
                  enabling collaboration and knowledge-sharing on a global scale.
                </p>
              </div>
            </div>

            <div className="vision-block-quaternary">
              <div className="vision-icon-placeholder">
                <div className="vision-icon-circle">
                  <svg className="vision-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
              </div>
              <div className="vision-block-content">
                <h3 className="vision-block-title">Accelerating Progress</h3>
                <p className="vision-block-text">
                  By providing an inclusive environment for dialogue and exchange, we strive to 
                  accelerate progress and drive advancements in Engineering disciplines.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        {/* <div className="vision-cta-section">
          <div className="vision-cta-content">
            <h3 className="vision-cta-title">Join Our Global Community</h3>
            <p className="vision-cta-description">
              Be part of the future of engineering research and innovation. 
              Connect with peers, share insights, and contribute to groundbreaking advancements.
            </p>
            <div className="vision-cta-buttons">
              <button className="vision-btn-primary">Submit Research</button>
              <button className="vision-btn-secondary">Browse Articles</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default VisionPage;
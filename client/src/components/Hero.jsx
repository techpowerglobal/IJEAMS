import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <>
      {/* Hero Section with background */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>International Journal of Advanced Engineering and Management System</h1>
          
            <p className="hero-description">
              International Journal of Advanced Engineering and Management System is an
              International journal that gives open access to a wide range of topics in
              Engineering studies. It enables the scholars to have access to trending
              resources in various fields in engineering such as Civil, Mechanical,
              Electrical and Electronics, Electronics and Communication, Computer
              Science, Information Technology and many more. 
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Section (separate, below the hero image) */}
      <section className="info-section">
        <div className="info-cards">
          <div className="card publisher-card">
            <h3>Publisher</h3>
            <div className="card-content">
              <p><strong>Chandrasekaran Appathurai</strong></p>
              <p>#705 First Floor, Cape Road, Veppamoodu Jn</p>
              <p>Nagercoil - 629001, Tamil Nadu, India</p>
              <p>📞 +91 9677262710</p>
              <p>✉️ contact.ijaems@gmail.com</p>
            </div>
          </div>
          
          <div className="card journal-card">
            <h3>Journal Details</h3>
            <div className="card-content">
              <p><strong>Publisher:</strong> Chandrasekaran Appathurai</p>
              <p><strong>Chief Editor:</strong> Dr.C.Mythili</p>
              <p><strong>Frequency:</strong> Quarterly</p>
              <p><strong>Language:</strong> English</p>
              <p><strong>Starting year:</strong> 2025</p>
              <p><strong>Format:</strong> Online</p>
              <p><strong>Subject:</strong> Engineering and Management</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

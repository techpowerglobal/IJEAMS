import React from "react";
import "./ContactPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar/>
    
    <div className="ijaems-contact-container">
      <div className="ijaems-contact-wrapper">
        <h1 className="ijaems-contact-title">Contact Us</h1>
        <p className="ijaems-contact-subtitle">
          We’re here to help and answer any questions you might have.  
          Reach out to us using the details below.
        </p>

        <div className="ijaems-contact-card">
          <h2 className="ijaems-contact-heading">Publisher</h2>
          <p className="ijaems-contact-text">
            Chandrasekaran Appathurai <br />
            #705 First Floor, Cape Road, Veppamoodu Jn <br />
            Nagercoil - 629001 <br />
            Tamil Nadu, India
          </p>
        </div>

        <div className="ijaems-contact-info">
          <div className="ijaems-contact-item">
            <span className="ijaems-contact-label">Email:</span>
            <a href="mailto:contact.ijaems@gmail.com" className="ijaems-contact-link">
              contact.ijaems@gmail.com
            </a>
          </div>
          <div className="ijaems-contact-item">
            <span className="ijaems-contact-label">Phone:</span>
            <a href="tel:+919677262710" className="ijaems-contact-link">
              +91 9677262710
            </a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default ContactPage;
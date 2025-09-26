import React from "react";
import "./Indexing.css";
import googleLogo from "../assets/google-scholar.png";  // Put your Google Scholar logo in assets
import crossrefLogo from "../assets/crossref.png";      // Put your Crossref logo in assets
import issnlogo from "../assets/issnlogo.png"; 
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Indexing = () => {
  return (
    <>
    <Navbar/>
    <div className="indexing-container">
      <header className="ijams-indexing__header" role="banner" aria-label="Indexing Header">
  <div className="ijams-indexing__container">
    <h1 className="ijams-indexing__title">Indexing And Abstracting</h1>
    <p className="ijams-indexing__subtitle">
      International Journal of Advanced Engineering and Management System (IJAEMS)
    </p>
  </div>
</header>
      <div className="indexing-logos">
        <img src={googleLogo} alt="Google Scholar" className="indexing-logo" />
        <img src={crossrefLogo} alt="Crossref" className="indexing-logo" />
        <img src={issnlogo} alt="Issn Logo" className="issn-logo"/>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Indexing;

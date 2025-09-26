import React from "react";
import "./article-processing.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ArticleProcessing = () => {
  return (
    <>
    <Navbar/>
    <main className="ijams-apc">
      {/* Header */}
      <header
        className="ijams-apc__header"
        role="banner"
        aria-label="Article Processing Charges Header"
      >
        <div className="ijams-apc__container">
          <h1 className="ijams-apc__title">Article Processing Charges (APC)</h1>
          <p className="ijams-apc__subtitle">
            International Journal of Advanced Engineering and Management System (IJAEMS)
          </p>
        </div>
      </header>

      {/* Content */}
      <section
        className="ijams-apc__content"
        aria-labelledby="apc-overview-heading"
      >
        <div className="ijams-apc__container ijams-apc__container--narrow">
          <h2 id="apc-overview-heading" className="ijams-apc__section-title">
            Open Access & Processing Charges
          </h2>
          <p className="ijams-apc__lead">
            Articles published in IJAEMS are freely accessible to everyone
            under our open access policy. To cover the costs of publication,
            authors are required to pay an Article Processing Charge (APC).
          </p>

          <div className="ijams-apc__card">
            <h3 className="ijams-apc__card-title">APC Structure</h3>
            <ul className="ijams-apc__list">
              <li>
                <strong>INR 1500</strong> for manuscripts up to 15 pages.
              </li>
              <li>
                For manuscripts exceeding 15 pages, an additional{" "}
                <strong>INR 150 per extra page</strong> will be charged.
              </li>
            </ul>
          </div>

          {/* Optional illustration from Freepik */}
          {/* <img 
            src="/assets/freepik-apc-illustration.svg" 
            alt="Article Processing Illustration" 
            className="ijams-apc__illustration" 
          /> */}
        </div>
      </section>

      
    </main>
    <Footer/>
    </>
  );
};

export default ArticleProcessing;
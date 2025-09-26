import React from "react";
import "./publication-ethics.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PublicationEthics = () => {
  return (
    <>
    <Navbar/>
    <main className="ijams-ethics">
      {/* Page Header */}
      <header className="ijams-ethics__header" role="banner" aria-label="Publication Ethics Header">
        <div className="ijams-ethics__container">
          <h1 className="ijams-ethics__title">Publication Ethics</h1>
          <p className="ijams-ethics__subtitle">
            International Journal of Advanced Engineering and Management System (IJAEMS)
          </p>
        </div>
      </header>

      {/* Intro / COPE */}
      <section className="ijams-ethics__intro" aria-labelledby="intro-heading">
        <div className="ijams-ethics__container ijams-ethics__container--narrow">
          <h2 id="intro-heading" className="ijams-ethics__section-title">Our Ethical Commitment</h2>
          <p className="ijams-ethics__lead">
            At IJAEMS, we adhere to robust ethical practices to uphold the standard and credibility of our work. We request
            scholars, authors, reviewers, and editors to follow the core practices outlined by the Committee on Publication
            Ethics (COPE) to maintain publication credibility.
          </p>
          <div className="ijams-ethics__note" role="note" aria-label="COPE Note">
            <strong>COPE Alignment:</strong> We encourage all stakeholders to consult COPE’s guidelines and flowcharts for best practices in publication ethics.
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="ijams-ethics__grid" aria-label="Roles and Responsibilities">
        <div className="ijams-ethics__container">
          {/* Authors */}
          <article className="ijams-ethics__card" aria-labelledby="authors-heading">
            <div className="ijams-ethics__card-head">
              <h3 id="authors-heading" className="ijams-ethics__card-title">Authors</h3>
            </div>
            <div className="ijams-ethics__card-body">
              <ul className="ijams-ethics__list">
                <li>Authors must disclose any conflicts of interest and ethical issues upon submission.</li>
                <li>Data and methods used in the manuscript should be provided for reference by reviewers and scholars.</li>
                <li>
                  Plagiarism in any form is strictly prohibited. Do not submit the same manuscript to multiple journals simultaneously.
                  Proper citation and credit must be given for any information used.
                </li>
              </ul>
            </div>
          </article>

          {/* Editors */}
          <article className="ijams-ethics__card" aria-labelledby="editors-heading">
            <div className="ijams-ethics__card-head">
              <h3 id="editors-heading" className="ijams-ethics__card-title">Editors</h3>
            </div>
            <div className="ijams-ethics__card-body">
              <ul className="ijams-ethics__list">
                <li>Editors should maintain fairness and impartiality towards authors.</li>
                <li>Confidentiality of the work and author information must be maintained.</li>
                <li>The final decision to publish a paper rests with the main editor.</li>
              </ul>
            </div>
          </article>

          {/* Reviewers */}
          <article className="ijams-ethics__card" aria-labelledby="reviewers-heading">
            <div className="ijams-ethics__card-head">
              <h3 id="reviewers-heading" className="ijams-ethics__card-title">Reviewers</h3>
            </div>
            <div className="ijams-ethics__card-body">
              <ul className="ijams-ethics__list">
                <li>Reviewers should keep their role confidential to ensure journal integrity.</li>
                <li>Any conflicts of interest should be disclosed in advance to avoid bias.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      
    </main>
    <Footer/>
    </>
  );
};

export default PublicationEthics;
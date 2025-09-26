import React from 'react';
import './AuthorsPage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AuthorsPage = () => {
  return (
    <>
    <Navbar/>
    <div className="ijaems-authors-container">
      <div className="ijaems-content-wrapper">
        {/* Header Section */}
        <header className="ijaems-page-header">
          <h1 className="ijaems-main-title">
            International Journal of Advanced Engineering and Management System
          </h1>
          <h2 className="ijaems-page-subtitle">Instructions to Authors</h2>
        </header>

        {/* Introduction */}
        <section className="ijaems-intro-section">
          <div className="ijaems-notice-box">
            <p className="ijaems-notice-text">
              Please make sure that your manuscript matches <strong>International Journal of Advanced Engineering and Management System</strong> template, before submitting the manuscript.
            </p>
          </div>
        </section>

        {/* Main Guidelines */}
        <section className="ijaems-guidelines-section">
          <h3 className="ijaems-section-title">Manuscript Submission Guidelines</h3>
          <p className="ijaems-intro-text">
            Manuscripts should be submitted online and authors are expected to adhere to the following guidelines:
          </p>

          {/* Language */}
          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Language</h4>
            <p className="ijaems-guideline-text">
              Manuscripts must be written in English. Grammar checks will be conducted, and necessary changes will be made as needed.
            </p>
          </div>

          {/* Cover Letter */}
          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Cover Letter</h4>
            <p className="ijaems-guideline-text">
              Include a cover letter signed by the authors, declaring the originality of the work and confirming that it hasn't been published previously. Authors must adhere to <strong>International Journal of Advanced Engineering and Management System</strong> publication terms, disclose any conflicts of interest, and agree to pay the Article Processing Charge (APC).
            </p>
          </div>

          {/* Template */}
          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Template</h4>
            <p className="ijaems-guideline-text">
              Authors must strictly adhere to <strong>International Journal of Advanced Engineering and Management System</strong> template.
            </p>
          </div>

          {/* Manuscript Formatting */}
          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Manuscript Formatting</h4>
            
            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Title and Author Information</h5>
              <p className="ijaems-guideline-text">
                The title should be centered, bold, in Times New Roman font, with each word capitalized. Authors' full names and affiliations should follow, numbered according to their affiliations. Corresponding author should be indicated with a superscript. Abstract should follow with two line breaks.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Abstract</h5>
              <p className="ijaems-guideline-text">
                Length should be between 200-400 words for research papers and 150-300 words for review papers. No reference citations should be included, and abbreviations should be explained upon first use.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Keywords</h5>
              <p className="ijaems-guideline-text">
                Include at least three keywords separated by semicolons, with the first letter of the first keyword capitalized.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Text Layout</h5>
              <p className="ijaems-guideline-text">
                Use US letter size paper with 1.0" margins. Text should be single-spaced in Times New Roman font, with appropriate font sizes for different sections. Indentation, spacing, and heading formats should be as specified.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Equations and Mathematical Expressions</h5>
              <p className="ijaems-guideline-text">
                Use in-line style for equations and mathematical expressions, ensuring they are editable text.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Figures and Tables</h5>
              <p className="ijaems-guideline-text">
                Figures should be submitted in digital format with legends, while tables should be centered with captions above them.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Citations</h5>
              <p className="ijaems-guideline-text">
                References should be cited numerically within the main text, with corresponding numbers in square brackets. Reference list should be included at the end of the paper.
              </p>
            </div>

            <div className="ijaems-sub-guideline">
              <h5 className="ijaems-sub-title">Acknowledgement</h5>
              <p className="ijaems-guideline-text">
                List contributors not included as authors in a left-justified, bold format.
              </p>
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Language Correction</h4>
            <p className="ijaems-guideline-text">
              Manuscripts should be clear with no grammar mistakes, with the editor team making necessary corrections if needed.
            </p>
          </div>

          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Copyright</h4>
            <p className="ijaems-guideline-text">
              Authors must sign a copyright form to claim originality of their work.
            </p>
          </div>

          <div className="ijaems-guideline-block">
            <h4 className="ijaems-guideline-title">Removal of Content</h4>
            <p className="ijaems-guideline-text">
              <strong>International Journal of Advanced Engineering and Management System</strong> reserves the right to remove content for various reasons, including legal orders, defamatory content, and health impacts.
            </p>
          </div>
        </section>

        {/* Footer */}
        
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AuthorsPage;
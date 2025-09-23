import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./PaperDetails.css";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const PaperDetails = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/submissions/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPaper(data.data);
        } else {
          setError("Failed to load paper details.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Server error.");
      });
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="paper-details-container">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!paper) return null;

  return (
    <>
      <Navbar />
      <div className="paper-details-container">
        {/* Title */}
        <h1 className="paper-title">{paper.title}</h1>

        {/* Metadata */}
        <p>
          <strong>Publication Date:</strong>{" "}
          {paper.createdAt
            ? new Date(paper.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Author(s):</strong> {paper.author}
        </p>
        <p>
          <strong>Publisher Email:</strong> {paper.email}
        </p>
        <p>
          <strong>Organization:</strong> {paper.organization || "N/A"}
        </p>
        <p>
          <strong>Keywords:</strong>{" "}
          {paper.keywords && paper.keywords.length > 0
            ? paper.keywords.join(", ")
            : "N/A"}
        </p>

        {/* Abstract */}
        <h3>Abstract :</h3>
        <p className="paper-abstract">{paper.abstract}</p>

        {/* Download Section */}
        {/* <div className="download-section">
          <a
            href={`http://localhost:5000/api/submissions/public/files/${paper._id}`}
            className="btn download-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            📄 Download PDF
          </a>
          <p className="download-count">
            Downloads: {paper.downloadCount ? paper.downloadCount : 0}
          </p>
        </div> */}


         <div className="download-section">
  <a
  href={`${API_BASE}/api/submissions/public/files/${paper.pdfFileId}`}
  className="btn download-btn"
  download
>
  📄 Download PDF
</a>

<p className="download-count">
  Downloads: {paper.downloadCount || 0}
</p>

        </div> 
      </div>
      <Footer />
    </>
  );
};

export default PaperDetails;

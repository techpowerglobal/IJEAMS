import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./IssueDetails.css";

// ✅ Same volume/issue logic used in PastIssue.js
const getPaperVolumeAndIssue = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan
  let volume = year - 2024;
  let issue = null;

  if (year === 2025) {
    if (month >= 3 && month <= 5) issue = 1; // Apr–Jun
    else if (month >= 6 && month <= 8) issue = 2; // Jul–Sep
    else if (month >= 9 && month <= 11) issue = 3; // Oct–Dec
  } else {
    if (month <= 2) issue = 1; // Jan–Mar
    else if (month >= 3 && month <= 5) issue = 2; // Apr–Jun
    else if (month >= 6 && month <= 8) issue = 3; // Jul–Sep
    else if (month >= 9 && month <= 11) issue = 4; // Oct–Dec
  }

  return { year, volume, issue };
};

const IssueDetails = () => {
  const { year, volume, issue } = useParams(); // values from URL
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/submissions/approved");
        const data = await res.json();

        if (data.success) {
          // ✅ Filter only papers from this issue
          const filtered = data.data.filter((paper) => {
            if (!paper.createdAt) return false;

            const { year: y, volume: v, issue: i } = getPaperVolumeAndIssue(
              paper.createdAt
            );

            return (
              y.toString() === year &&
              v.toString() === volume &&
              i?.toString() === issue
            );
          });

          setPapers(filtered);
        }
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };
    fetchPapers();
  }, [year, volume, issue]);

  return (
    <div>
      <Navbar />
      <div className="issue-details-container">
        <h2>
          Year {year} – Volume {volume}, Issue {issue}
        </h2>
        <table className="papers-table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Paper Id</th>
              <th>Title</th>             
            </tr>
          </thead>
          <tbody>
  {papers.length > 0 ? (
    papers.map((paper, idx) => (
      <tr key={paper._id}>
        <td>{idx + 1}</td>
        <td>{paper.paperId || `PAPER_${idx + 1}`}</td>
        <td>
          <a
            href={`/paper-details/${paper._id}`}
            className="paper-link"
          >
            {paper.title}
          </a>
          <br />
          <small>Author(s): {paper.author}</small>
          <br />
          <small>
            Volume {volume} | Issue {issue} ({year})
          </small>
          <br />
          {paper.doi && <small>DOI: {paper.doi}</small>}
        </td>
     
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4">No papers found for this issue.</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      <Footer />
    </div>
  );
};

export default IssueDetails;

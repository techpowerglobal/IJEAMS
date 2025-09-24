import React, { useEffect, useState } from "react";
import "./CurrentIssue.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://ijaems.in/api";
const CurrentIssue = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  // ✅ Get Current Volume & Issue
  const getCurrentVolumeAndIssue = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan

    let volume = year - 2024;
    let issue = 1;

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

    return { volume, issue, year };
  };

  // ✅ Get Paper Volume & Issue
  const getPaperVolumeAndIssue = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const volume = year - 2024;

    let issue = 1;

    if (year === 2025) {
      if (month >= 3 && month <= 5) issue = 1;
      else if (month >= 6 && month <= 8) issue = 2;
      else if (month >= 9 && month <= 11) issue = 3;
    } else {
      if (month <= 2) issue = 1;
      else if (month >= 3 && month <= 5) issue = 2;
      else if (month >= 6 && month <= 8) issue = 3;
      else if (month >= 9 && month <= 11) issue = 4;
    }

    return { volume, issue };
  };

  useEffect(() => {
     fetch(`${API_BASE}/api/submissions/approved`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const { volume, issue, year } = getCurrentVolumeAndIssue();

          // ✅ Only include current issue papers
          const currentPapers = data.data.filter((paper) => {
            if (!paper.createdAt) return false;
            const paperDate = new Date(paper.createdAt);
            const paperYear = paperDate.getFullYear();
            const { volume: paperVolume, issue: paperIssue } =
              getPaperVolumeAndIssue(paper.createdAt);

            return (
              paperYear === year &&
              paperVolume === volume &&
              paperIssue === issue
            );
          });

          setPapers(currentPapers);
        } else {
          setError("Failed to load approved papers.");
        }
      })
      .catch(() => setError("Server error."));
  }, []);

  const { volume, issue, year } = getCurrentVolumeAndIssue();

  return (
    <>
      <Navbar />
      <div className="current-issue-container">
        <h1>
          Current Issue: Volume {volume}, Issue {issue} ({year})
        </h1>
        {error && <p className="error-message">{error}</p>}

        {papers.length > 0 ? (
          <table className="papers-table">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Paper Id</th>
                <th>Title</th>
                <th>Author(s)</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr key={paper._id}>
                  <td>{index + 1}</td>
                  <td>{paper.paperId || `PAPER_${index + 1}`}</td>
                  <td>
                    <a
                      href={`/paper-details/${paper._id}`}
                      className="paper-link"
                    >
                      {paper.title}
                    </a>
                  </td>
                  <td>{paper.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No papers found for the current issue.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CurrentIssue;

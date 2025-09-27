import React, { useEffect, useState } from "react";
import "./CurrentIssue.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

const CurrentIssue = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  // 🔹 Current Volume & Issue
  const getCurrentVolumeAndIssue = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0 = Jan

    const volume = year - 2015; // Example: Volume starts from 2016 = Vol 1 (adjust if needed)
    let issue = 1;

    // Quarter / issue mapping
    if (month <= 2) issue = 1; // Jan–Mar
    else if (month <= 5) issue = 2; // Apr–Jun
    else if (month <= 8) issue = 3; // Jul–Sep
    else issue = 4; // Oct–Dec

    return { volume, issue, year };
  };

  // 🔹 Get Paper Volume & Issue (based on createdAt)
  const getPaperVolumeAndIssue = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const volume = year - 2015;

    let issue = 1;
    if (month <= 2) issue = 1;
    else if (month <= 5) issue = 2;
    else if (month <= 8) issue = 3;
    else issue = 4;

    return { volume, issue, year };
  };

  // 🔹 Fetch Approved Submissions
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch(`${API_BASE}/submissions/approved`);
        const data = await res.json();

        if (!data.success) {
          setError("Failed to load approved papers.");
          return;
        }

        const { volume, issue, year } = getCurrentVolumeAndIssue();

        // Filter only current issue papers
        const currentPapers = data.data.filter((paper) => {
          if (!paper.createdAt) return false;

          const { volume: paperVolume, issue: paperIssue, year: paperYear } =
            getPaperVolumeAndIssue(paper.createdAt);

          return (
            paperYear === year &&
            paperVolume === volume &&
            paperIssue === issue
          );
        });

        setPapers(currentPapers);
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError("Server error. Please try again later.");
      }
    };

    fetchPapers();
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
          !error && <p>No papers found for the current issue.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CurrentIssue;

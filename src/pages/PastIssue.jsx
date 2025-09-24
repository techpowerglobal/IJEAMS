import React, { useEffect, useState } from "react";
import "./PastIssue.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://ijaems.in/api";
const PastIssue = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  // ✅ Get Current Volume & Issue
  const getCurrentVolumeAndIssue = () => {
    const now = new Date();
    return getVolumeAndIssue(now);
  };

  // ✅ Unified Helper for Volume & Issue
  const getVolumeAndIssue = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 = Jan
    let volume = year - 2024;
    let issue = 1;

    if (year === 2025) {
      if (month >= 3 && month <= 5) issue = 1; // Apr–Jun
      else if (month >= 6 && month <= 8) issue = 2; // Jul–Sep
      else if (month >= 9 && month <= 11) issue = 3; // Oct–Dec
      else issue = null; // Jan–Mar has no issue in 2025
    } else {
      if (month <= 2) issue = 1; // Jan–Mar
      else if (month >= 3 && month <= 5) issue = 2; // Apr–Jun
      else if (month >= 6 && month <= 8) issue = 3; // Jul–Sep
      else if (month >= 9 && month <= 11) issue = 4; // Oct–Dec
    }

    return { volume, issue, year };
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/submissions/approved`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const { volume, issue, year } = getCurrentVolumeAndIssue();

          // ✅ Exclude current issue papers
          const pastPapers = data.data.filter((paper) => {
            if (!paper.createdAt) return false;
            const paperDate = new Date(paper.createdAt);
            const paperYear = paperDate.getFullYear();
            const { volume: paperVolume, issue: paperIssue } =
              getVolumeAndIssue(paperDate);

            if (!paperIssue) return false; // skip invalid months in 2025

            return !(
              paperYear === year &&
              paperVolume === volume &&
              paperIssue === issue
            );
          });

          setPapers(pastPapers);
        } else {
          setError("Failed to load approved papers.");
        }
      })
      .catch(() => setError("Server error."));
  }, []);

  // ✅ Group papers by Year → Volume → Issue
  const grouped = papers.reduce((acc, paper) => {
    const { volume, issue, year } = getVolumeAndIssue(new Date(paper.createdAt));
    if (!issue) return acc; // skip invalid

    if (!acc[year]) acc[year] = {};
    if (!acc[year][volume]) acc[year][volume] = {};
    if (!acc[year][volume][issue]) acc[year][volume][issue] = [];
    acc[year][volume][issue].push(paper);

    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="past-issue-container">
        <h1>Past Issues</h1>
        {error && <p className="error-message">{error}</p>}

        {Object.keys(grouped).length > 0 ? (
          Object.keys(grouped)
            .sort((a, b) => b - a) // sort by year desc
            .map((year) => (
              <div key={year} className="year-block">
                <h2>{year}</h2>
                {Object.keys(grouped[year])
                  .sort((a, b) => b - a) // volume desc
                  .map((volume) =>
                    Object.keys(grouped[year][volume])
                      .sort((a, b) => b - a) // issue desc
                      .map((issue) => {
                        const key = `${year}-${volume}-${issue}`;
                        return (
                          <div key={key} className="issue-block">
                            <Link
                              to={`/issues/${year}/${volume}/${issue}`}
                              className="issue-link"
                            >
                              Volume {volume} | Issue {issue}
                            </Link>
                          </div>
                        );
                      })
                  )}
              </div>
            ))
        ) : (
          <p>No past issues found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PastIssue;

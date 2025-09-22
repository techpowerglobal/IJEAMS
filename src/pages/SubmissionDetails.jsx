import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SubmissionDetails.css";

const SubmissionDetails = () => {
  const { id } = useParams(); // Get submission id from URL
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Comment states
  const [comment, setComment] = useState("");
  const [userEmail, setUserEmail] = useState(""); // 👈 email input
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);

  // Fetch submission details
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/submissions/details/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("📌 Raw API response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          throw new Error("Server did not return JSON. Response was: " + text);
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch submission");
        }

        if (data.success && data.data) {
          setSubmission(data.data);
        } else if (data._id) {
          setSubmission(data);
        } else {
          setError("Submission not found.");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching submission:", err);
        setError(
          err.message ||
            "Something went wrong while fetching submission details."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Fetch existing comments
  useEffect(() => {
    fetch(`http://localhost:5000/api/comments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      })
      .catch((err) => console.error("❌ Error fetching comments:", err));
  }, [id]);

  // Submit new comment
  const handleCommentSubmit = async () => {
    if (!comment) return alert("Comment cannot be empty!");
    if (!userEmail) return alert("Please enter user email!");

    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionId: id,
          userEmail,
          comment,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("✅ Comment submitted and emailed to user!");
        setComment("");
        setUserEmail("");
        setComments((prev) => [data.comment, ...prev]); // prepend new comment
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    }
    setSubmitting(false);
  };

  if (loading) {
    return <p>Loading submission details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!submission) {
    return <p style={{ color: "red" }}>No submission data available.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="submission-details-page">
        <h2>{submission.title || "Untitled Submission"}</h2>
        <p>
          <strong>Author(s):</strong> {submission.author || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {submission.email || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {submission.status || "Pending"}
        </p>
        <p>
          <strong>Organization:</strong> {submission.organization || "N/A"}
        </p>
        <p>
          <strong>Keywords:</strong> {submission.keywords || "N/A"}
        </p>
        <h3>Abstract:</h3>
        <p>{submission.abstract || "No abstract provided."}</p>

        {/* Comment Section */}
        <div className="comment-box">
          <h3>Admin Comments</h3>

          <input
            type="email"
            placeholder="Enter user email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="email-input"
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
            rows="4"
            className="comment-textarea"
          />

          <button
            onClick={handleCommentSubmit}
            disabled={submitting}
            className="comment-btn"
          >
            {submitting ? "Submitting..." : "Submit Comment"}
          </button>

          {/* Display Existing Comments */}
          <div className="comment-list">
            <h4>Previous Comments:</h4>
            {comments.length > 0 ? (
              comments.map((c) => (
                <div key={c._id} className="comment-item">
                  <p>{c.comment}</p>
                  <small>
                    Sent to: <strong>{c.userEmail}</strong> •{" "}
                    {new Date(c.createdAt).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubmissionDetails;

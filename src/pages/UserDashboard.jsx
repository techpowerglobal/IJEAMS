import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
} from "lucide-react";
import "./UserDashboard.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MultiStepForm from "../components/MultiStepForm";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const UserDashboard = () => {
  const [UsersidebarOpen, setUserSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [submissions, setSubmissions] = useState([]);
  const [comments, setComments] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // fallback if stored email is in localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setUserEmail(storedEmail);

    fetchUserSubmissions(token);
  }, []);

  const fetchUserSubmissions = (token) => {
    fetch(`${API_BASE}/api/submissions/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch submissions");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSubmissions(data.data);
          fetchUserComments(data.data);
        } else {
          setSubmissions([]);
          setError("Failed to load your submissions");
        }
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
        setError("Failed to fetch submissions");
      });
  };

 const fetchUserComments = async (userSubs) => {
  try {
    let allComments = [];
    let unread = 0;

    for (const sub of userSubs) {
      const res = await  fetch(`${API_BASE}/api/comments/${sub._id}`);
      const data = await res.json();

      if (data.success) {
        const commentsWithTitle = data.comments.map((c) => ({
          ...c,
          submissionId: sub,
        }));
        allComments = [...allComments, ...commentsWithTitle];

        // ✅ Count only unread ones
        unread += data.comments.filter((c) => c.read === false).length;
      }
    }

    setComments(
      allComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
    setUnreadCount(unread); // ✅ only shows count of unread
  } catch (err) {
    console.error("Error fetching comments:", err);
  }
};


  const markAllNotificationsRead = async () => {
  if (!userEmail) return;

  try {
    const res = await fetch(
      `${API_BASE}/api/comments/mark-read/${userEmail}`,
      { method: "PUT" }
    );
    const data = await res.json();

    if (data.success) {
      // ✅ Clear badge permanently
      setUnreadCount(0);

      // ✅ Mark all as read in state too
      setComments((prev) =>
        prev.map((c) => ({ ...c, read: true }))
      );
    }
  } catch (err) {
    console.error("Error marking notifications as read:", err);
  }
};


  const handleNavClick = async (tab) => {
  if (tab === "logout") {
    localStorage.removeItem("token");
    window.location.href = "/account";
    return;
  }

  setActiveTab(tab);
  setUserSidebarOpen(false);

  if (tab === "notifications") {
    // ✅ Immediately clear badge
    setUnreadCount(0);

    // ✅ Update local state (so comments show as read)
    setComments((prev) =>
      prev.map((c) => ({ ...c, read: true }))
    );

    // ✅ Then call backend
    await markAllNotificationsRead();
  }
};


  const calculateProgress = (value, total) => {
    if (total === 0) return 0;
    return Math.min((value / total) * 100, 100);
  };

  const totalSubmissions = submissions.length;
  const rejectedCount = submissions.filter((s) => s.status === "rejected").length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;
  const pendingCount = submissions.filter((s) => s.status === "submitted").length;

  const getStrokeDashOffset = (percentage) => {
    return 314 - (314 * percentage) / 100;
  };

  const CircularProgress = ({ percentage, children }) => {
    const strokeDashoffset = getStrokeDashOffset(percentage);
    return (
      <div className="circular-progress">
        <svg viewBox="0 0 100 100">
          <circle className="progress-circle-bg" cx="50" cy="50" r="45" />
          <circle
            className="progress-circle"
            cx="50"
            cy="50"
            r="45"
            style={{
              strokeDashoffset: strokeDashoffset,
              "--progress-offset": strokeDashoffset,
            }}
          />
        </svg>
        {children}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div id="user-dashboard" className="user-tab-content active">
            <h2>Dashboard Overview</h2>
            <p>Monitor and manage your application's key metrics</p>
            <div className="user-stats-grid">
              {/* Total */}
              <div className="user-stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <Upload size={24} />
                  </div>
                  <h3>Total Uploaded Papers</h3>
                </div>
                <CircularProgress percentage={totalSubmissions > 0 ? 75 : 0}>
                  <p className="stat-number">{totalSubmissions}</p>
                </CircularProgress>
              </div>

              {/* Rejected */}
              <div className="user-stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <XCircle size={24} />
                  </div>
                  <h3>Rejected Papers</h3>
                </div>
                <CircularProgress
                  percentage={
                    totalSubmissions > 0
                      ? (rejectedCount / totalSubmissions) * 100
                      : 0
                  }
                >
                  <p className="stat-number">{rejectedCount}</p>
                </CircularProgress>
              </div>

              {/* Approved */}
              <div className="user-stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <CheckCircle size={24} />
                  </div>
                  <h3>Approved Papers</h3>
                </div>
                <CircularProgress
                  percentage={
                    totalSubmissions > 0
                      ? (approvedCount / totalSubmissions) * 100
                      : 0
                  }
                >
                  <p className="stat-number">{approvedCount}</p>
                </CircularProgress>
              </div>

              {/* Pending */}
              <div className="user-stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <Clock size={24} />
                  </div>
                  <h3>Pending Papers</h3>
                </div>
                <CircularProgress
                  percentage={
                    totalSubmissions > 0
                      ? (pendingCount / totalSubmissions) * 100
                      : 0
                  }
                >
                  <p className="stat-status">{pendingCount}</p>
                </CircularProgress>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div id="user-management" className="user-tab-content active">
            <h2>Upload Journal Paper</h2>
            <MultiStepForm
              onUploadSuccess={() => {
                const token = localStorage.getItem("token");
                fetchUserSubmissions(token);
              }}
            />
          </div>
        );

      case "submissions":
        return (
          <div id="user-submissions" className="user-tab-content active">
            <h2>My Submissions</h2>
            {error && <p className="error-message">{error}</p>}
            {submissions.length > 0 ? (
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Email</th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub, index) => (
                    <tr key={sub._id}>
                      <td>{index + 1}</td>
                      <td>{sub.title}</td>
                      <td>{sub.author}</td>
                      <td>{sub.email}</td>
                      <td>{sub.organization || "N/A"}</td>
                      <td className={sub.status?.toLowerCase() || "pending"}>
                        {sub.status || "Pending"}
                      </td>
                      <td>
                        {sub.createdAt
                          ? new Date(sub.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !error && <p>No submissions found.</p>
            )}
          </div>
        );

      case "notifications":
        return (
          <div id="user-notifications" className="user-tab-content active">
            <h2>Notifications</h2>
            {comments.length > 0 ? (
              <table className="notification-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((c) => (
                    <tr key={c._id}>
                      <td>{c.submissionId?.title}</td>
                      <td>{c.submissionId?.author}</td>
                      <td className="comment">{c.comment}</td>
                      <td>{new Date(c.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-notifications">No new notifications.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className="user-dashboard-container">
        <button
          className="user-mobile-menu-toggle"
          onClick={() => setUserSidebarOpen(!UsersidebarOpen)}
        >
          <Menu />
        </button>

        <div
          className={`user-sidebar ${UsersidebarOpen ? "sidebar-open" : ""}`}
        >
          <div className="user-sidebar-header">
            <h1>User Panel</h1>
          </div>
          <nav className="user-sidebar-nav">
            <button
              className={`user-nav-item ${
                activeTab === "dashboard" ? "user-nav-item-active" : ""
              }`}
              onClick={() => handleNavClick("dashboard")}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
            <button
              className={`user-nav-item ${
                activeTab === "users" ? "user-nav-item-active" : ""
              }`}
              onClick={() => handleNavClick("users")}
            >
              <Users />
              <span>Uploads</span>
            </button>
            <button
              className={`user-nav-item ${
                activeTab === "submissions" ? "user-nav-item-active" : ""
              }`}
              onClick={() => handleNavClick("submissions")}
            >
              <FileText />
              <span>Submissions</span>
            </button>
            <button
              className={`user-nav-item ${
                activeTab === "notifications" ? "user-nav-item-active" : ""
              }`}
              onClick={() => handleNavClick("notifications")}
            >
              <Bell />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>
            <button
              className="user-nav-item user-nav-item-logout"
              onClick={() => handleNavClick("logout")}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {UsersidebarOpen && (
          <div
            className="user-mobile-overlay"
            onClick={() => setUserSidebarOpen(false)}
          ></div>
        )}

        <div className="user-main-content">
          <div className="user-content-body" id="contentArea">
            {renderContent()}
          </div>
        </div>
      </div>
  
    </>
  );
};

export default UserDashboard;

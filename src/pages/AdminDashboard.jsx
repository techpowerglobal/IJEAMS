import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu,
  UserCheck,
  FileUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import "./AdminDashboard.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://ijaems.in/api";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [pendingSubmissions, setPendingSubmissions] = useState(0);
  const [approvedSubmissions, setApprovedSubmissions] = useState(0);
  const [submissionsList, setSubmissionsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login"; // Redirect if not logged in
      return;
    }

    // Always fetch data when the component loads (even after refresh)
    fetchUsers(token);
    fetchSubmissions(token);
  }, []);

  const fetchUsers = (token) => {
    fetch(`${API_BASE}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalUsers(data.data.length);
          setUsersList(data.data); // Store user list for User Management tab
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  const fetchSubmissions = (token) => {
    fetch(`${API_BASE}/api/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalSubmissions(data.data.length);
          setPendingSubmissions(
            data.data.filter((s) => s.status === "submitted").length
          );
          setApprovedSubmissions(
            data.data.filter((s) => s.status === "approved").length
          );
          setSubmissionsList(data.data); // Store for Submissions tab
        }
      })
      .catch((err) => console.error("Error fetching submissions:", err));
  };

  const handleNavClick = (tab) => {
    if (tab === "logout") {
      localStorage.removeItem("token");
      window.location.href = "/account";
      return;
    }
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="admin-tab-content active">
            <h2>Dashboard Overview</h2>
            <p>Monitor and manage your application's key metrics</p>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <UserCheck className="admin-stat-icon" />
                <div className="admin-stat-number" style={{'--percentage': Math.min((totalUsers / 10) * 100, 100)}}>
                  {totalUsers}
                </div>
                <h3>Total Users</h3>
              </div>
              <div className="admin-stat-card">
                <FileUp className="admin-stat-icon" />
                <div className="admin-stat-number" style={{'--percentage': Math.min((totalSubmissions / 30) * 100, 100)}}>
                  {totalSubmissions}
                </div>
                <h3>Total Files Uploaded</h3>
              </div>
              <div className="admin-stat-card">
                <CheckCircle className="admin-stat-icon" />
                <div className="admin-stat-number" style={{'--percentage': totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0}}>
                  {approvedSubmissions}
                </div>
                <h3>Total Approved Published</h3>
              </div>
              <div className="admin-stat-card">
                <Clock className="admin-stat-icon" />
                <div className="admin-stat-number" style={{'--percentage': totalSubmissions > 0 ? (pendingSubmissions / totalSubmissions) * 100 : 0}}>
                  {pendingSubmissions}
                </div>
                <h3>Total Pending Reviews</h3>
              </div>
            </div>
          </div>
        );

      case "users":
  return (
    <div className="admin-tab-content active">
      <h2>User Management</h2>
      <p>Manage registered users</p>
      
      {/* User count header */}
      <div className="admin-user-table-header">
        <div></div>
        <div className="admin-user-count">
          {totalUsers} Total Users
        </div>
      </div>
      
      {usersList.length === 0 ? (
        <div className="admin-user-table-empty">
          <div className="empty-icon">👤</div>
          <h3>No Users Found</h3>
          <p>No registered users to display at the moment.</p>
        </div>
      ) : (
        <table className="admin-user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user._id}>
                <td 
                  data-label="Name" 
                  data-initial={user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                >
                  {user.name || 'Unknown User'}
                  {user.submissions && (
                    <div className="user-stats">
                      <span className="user-stat">
                        📄 {user.submissions} submissions
                      </span>
                    </div>
                  )}
                </td>
                <td data-label="Email">
                  {user.email}
                </td>
                <td data-label="Role">
                  <span className={`status-badge status-${user.role || 'user'}`}>
                    {user.role || 'user'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

case "submissions":
  return (
    <div className="admin-tab-content active">
      <h2>Submissions</h2>
      <p>Review and manage article submissions</p>
      <table className="admin-submissions-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submissionsList.map((submission) => (
            <tr key={submission._id}>
             <td data-label="Title" className="clickable-title">
  <Link to={`/admin-dashboard/submission/${submission._id}`}>
    {submission.title}
  </Link>
</td>
              <td data-label="Author">{submission.author}</td>
              <td data-label="Email">{submission.email}</td>
              <td data-label="Status">
                <span className={`status-badge status-${submission.status}`}>
                  {submission.status}
                </span>
              </td>
              <td data-label="Action">
                {submission.status === "submitted" && (
                  <div className="action-buttons">
                    <button
                      onClick={() =>
                        updateSubmissionStatus(submission._id, "approved")
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateSubmissionStatus(submission._id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paste the details block here */}
      {selectedSubmission && (
        <div className="submission-details">
          <h2>{selectedSubmission.title}</h2>
          <p><strong>Author(s):</strong> {selectedSubmission.author}</p>
          <p><strong>Email:</strong> {selectedSubmission.email}</p>
          <p><strong>Status:</strong> {selectedSubmission.status}</p>
          <p><strong>Organization:</strong> {selectedSubmission.organization}</p>
          <p><strong>Keywords:</strong> {selectedSubmission.keywords}</p>
          <h3>Abstract:</h3>
          <p>{selectedSubmission.abstract}</p>

          <button onClick={() => setSelectedSubmission(null)}>Close</button>
        </div>
      )}
    </div>
  );

      default:
        return null;
    }
  };

  const updateSubmissionStatus = (id, newStatus) => {
    const token = localStorage.getItem("token");
     fetch(`${API_BASE}/api/submissions/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchSubmissions(token); // Refresh submissions after update
        }
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <button
          className="admin-mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu />
        </button>

        <div className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="admin-sidebar-header">
            <h1>AdminPanel</h1>
          </div>
          <nav className="admin-sidebar-nav">
            <button
              className={`admin-nav-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleNavClick("dashboard")}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
            <button
              className={`admin-nav-item ${
                activeTab === "users" ? "active" : ""
              }`}
              onClick={() => handleNavClick("users")}
            >
              <Users />
              <span>User Management</span>
            </button>
            <button
              className={`admin-nav-item ${
                activeTab === "submissions" ? "active" : ""
              }`}
              onClick={() => handleNavClick("submissions")}
            >
              <FileText />
              <span>Submission</span>
            </button>
            <button
              className="admin-nav-item logout"
              onClick={() => handleNavClick("logout")}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {sidebarOpen && (
          <div
            className="admin-mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="admin-main-content">
          <div className="admin-content-header">
          </div>
          <div className="admin-content-body">{renderContent()}</div>
        </div>
       
      </div>
     
      
    </>
  
  );
};

export default AdminDashboard;

import { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(30);
  const fileInputRef = useRef(null);

  // =========================
  // Fetch admin stats
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalStudents(data.total_students);
        }
      })
      .catch((err) => console.error("Failed to fetch stats:", err))
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // Upload Policy PDF
  // =========================
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploaded_by", "admin@campus.com");

    try {
      const res = await fetch("http://127.0.0.1:5000/admin/upload-policy", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setUploadStatus("✅ Policy uploaded successfully!");
      } else {
        setUploadStatus("❌ Upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploadStatus("❌ Server error during upload");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon"></div>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📤</span>
            <span className="nav-text">Upload</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span>
            <span className="nav-text">Students</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📋</span>
            <span className="nav-text">Policies</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📈</span>
            <span className="nav-text">Analytics</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="top-actions">
            <button className="icon-btn">🔔</button>
            <div className="user-profile">
              <span className="user-name">Admin Portal</span>
              <img
                src="https://i.pravatar.cc/150?img=33"
                alt="Admin"
                className="user-avatar"
              />
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-badge">ADMIN PORTAL</div>
            <h1 className="welcome-title">
              Command <span className="highlight">Center</span>
            </h1>
            <p className="welcome-subtitle">
              Manage policies • Generate checklists • Monitor student wellness
            </p>
          </div>
          <div className="welcome-illustration">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#F0F4FF" />
              <circle cx="100" cy="75" r="30" fill="#5B68F5" opacity="0.9" />
              <path
                d="M50 160c0-27.5 22.5-50 50-50s50 22.5 50 50"
                stroke="#5B68F5"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M140 80l8 13h11l-9 8 5 13-11-7-11 7 5-13-9-8h11z"
                fill="#FF9F43"
              />
            </svg>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-section">
          <div className="stat-card stat-card-1">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <div className="stat-number">0</div>
              <div className="stat-label">Policies Uploaded</div>
            </div>
          </div>

          <div className="stat-card stat-card-2">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <div className="stat-number">{loading ? "…" : totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>

          <div className="stat-card stat-card-3">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <div className="stat-number">0</div>
              <div className="stat-label">At-Risk Students</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Left Column - Action Cards */}
          <div className="left-column">
            {/* Upload Policy Card */}
            <section className="card action-card">
              <div className="card-header">
                <div className="card-icon-wrapper upload-icon">
                  <span className="card-emoji">📤</span>
                </div>
                <div>
                  <h3 className="card-title">Upload Policy Documents</h3>
                  <p className="card-subtitle">Upload PDF/DOC files</p>
                </div>
              </div>
              <p className="card-description">
                Upload official college guidelines to generate student checklists automatically.
              </p>
              <button className="btn btn-upload" onClick={handleUploadClick}>
                <span className="btn-text">Choose File</span>
                <span className="btn-icon">→</span>
              </button>
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {uploadStatus && (
                <div
                  className={`upload-status ${
                    uploadStatus.includes("✅") ? "status-success" : "status-error"
                  }`}
                >
                  {uploadStatus}
                </div>
              )}
            </section>

            {/* Generate Checklists Card */}
            <section className="card action-card">
              <div className="card-header">
                <div className="card-icon-wrapper generate-icon">
                  <span className="card-emoji">📋</span>
                </div>
                <div>
                  <h3 className="card-title">Generate Checklists</h3>
                  <p className="card-subtitle">Convert policies to tasks</p>
                </div>
              </div>
              <p className="card-description">
                Convert uploaded policies into actionable student task lists with deadlines.
              </p>
              <button className="btn btn-generate">
                <span className="btn-text">Generate Tasks</span>
                <span className="btn-icon">✨</span>
              </button>
            </section>

            {/* View At-Risk Card */}
            <section className="card action-card">
              <div className="card-header">
                <div className="card-icon-wrapper risk-icon">
                  <span className="card-emoji">🔍</span>
                </div>
                <div>
                  <h3 className="card-title">View At-Risk Students</h3>
                  <p className="card-subtitle">Early intervention system</p>
                </div>
              </div>
              <p className="card-description">
                Identify students who are falling behind and need support.
              </p>
              <button className="btn btn-risk">
                <span className="btn-text">View List</span>
                <span className="btn-icon">→</span>
              </button>
            </section>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* System Activity */}
            <section className="card activity-card">
              <div className="card-header">
                <h2 className="card-title">System Activity</h2>
                <select className="time-select">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              <div className="progress-circle-wrapper">
                <svg className="progress-circle" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="314"
                    strokeDashoffset="78"
                    transform="rotate(-90 60 60)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5B68F5" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <text
                    x="60"
                    y="60"
                    textAnchor="middle"
                    dy="8"
                    className="progress-text"
                  >
                    75%
                  </text>
                </svg>
              </div>
              <div className="progress-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#F1F5F9" }}></span>
                  <span>Pending</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: "#5B68F5" }}></span>
                  <span>Completed</span>
                </div>
              </div>
            </section>

            {/* Calendar */}
            <section className="card calendar-card">
              <div className="calendar-header">
                <h3 className="calendar-month">January 2023</h3>
                <button className="calendar-nav">→</button>
              </div>
              <div className="calendar-grid">
                <div className="calendar-day-label">Mo</div>
                <div className="calendar-day-label">Tu</div>
                <div className="calendar-day-label">We</div>
                <div className="calendar-day-label">Th</div>
                <div className="calendar-day-label">Fr</div>
                <div className="calendar-day-label">Sa</div>
                <div className="calendar-day-label">Su</div>

                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`calendar-day ${day === 10 ? "event-day" : ""} ${
                      day === selectedDate ? "selected-day" : ""
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="card activity-list-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
                <button className="view-all-btn">View all</button>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: "#FFF4E6" }}>
                    📄
                  </div>
                  <div className="activity-info">
                    <h4 className="activity-title">Policy Upload</h4>
                    <p className="activity-subtitle">Academic Guidelines.pdf</p>
                  </div>
                  <span className="activity-time">2h ago</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: "#E6F3FF" }}>
                    ✅
                  </div>
                  <div className="activity-info">
                    <h4 className="activity-title">Checklist Generated</h4>
                    <p className="activity-subtitle">48 tasks created</p>
                  </div>
                  <span className="activity-time">5h ago</span>
                </div>
                <div className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: "#FFE8E8" }}>
                    ⚠️
                  </div>
                  <div className="activity-info">
                    <h4 className="activity-title">Risk Alert</h4>
                    <p className="activity-subtitle">3 students flagged</p>
                  </div>
                  <span className="activity-time">1d ago</span>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="card quick-actions-card">
              <h3 className="card-title">Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📊</span>
                  <span className="quick-action-text">Analytics</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📧</span>
                  <span className="quick-action-text">Send Email</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">📢</span>
                  <span className="quick-action-text">Broadcast</span>
                </button>
                <button className="quick-action-btn">
                  <span className="quick-action-icon">⚙️</span>
                  <span className="quick-action-text">Settings</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
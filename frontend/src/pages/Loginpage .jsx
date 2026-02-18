import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlareHover from "./Glarehover";
import "./Loginpage.css";

const BACKEND_URL = "https://campusai-ygco.onrender.com"; // Change to your deployed backend URL


const StudentIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <circle cx="32" cy="22" r="10" fill="#a78bfa" opacity="0.9"/>
    <path d="M12 52c0-11 9-18 20-18s20 7 20 18" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9"/>
    <path d="M32 8L48 16l-16 8-16-8z" fill="#f9a8d4" opacity="0.8"/>
    <path d="M48 16v10" stroke="#f9a8d4" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="48" cy="28" r="2" fill="#f9a8d4"/>
  </svg>
);

const AdminIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
    <circle cx="32" cy="20" r="10" fill="#818cf8" opacity="0.9"/>
    <path d="M14 52c0-11 8-18 18-18s18 7 18 18" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9"/>
    <path d="M44 38l2 4h4l-3.5 3 1.5 4.5L44 47l-4 2.5 1.5-4.5L38 42h4z" fill="#f472b6" opacity="0.9"/>
  </svg>
);

const FloatingShape = ({ style }) => (
  <div className="floating-shape" style={style} />
);

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("student");
  const [studentForm, setStudentForm] = useState({ email: "", password: "", remember: false });
  const [adminForm, setAdminForm] = useState({ username: "", password: "", otp: "" });
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // Student Login Handler
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: studentForm.email,
          password: studentForm.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          if (data.role === "student") {
            navigate("/student");
          }
        }, 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminForm.username,
          password: adminForm.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          if (data.role === "admin") {
           navigate("/admin");
          }
        }, 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-root">
      {/* Background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* Floating decoration shapes */}
      <FloatingShape style={{ top: "8%", left: "6%", width: 60, height: 60, background: "linear-gradient(135deg,#fbbf24,#f9a8d4)", borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%", animationDelay: "0s" }} />
      <FloatingShape style={{ top: "18%", right: "7%", width: 44, height: 44, background: "linear-gradient(135deg,#a78bfa,#818cf8)", borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%", animationDelay: "1.2s" }} />
      <FloatingShape style={{ bottom: "12%", left: "10%", width: 36, height: 36, background: "linear-gradient(135deg,#f472b6,#fbbf24)", borderRadius: "50%", animationDelay: "2s" }} />
      <FloatingShape style={{ bottom: "20%", right: "9%", width: 52, height: 52, background: "linear-gradient(135deg,#67e8f9,#a78bfa)", borderRadius: "40% 60% 60% 40%/40% 40% 60% 60%", animationDelay: "0.7s" }} />

      <div className="login-container">
        {/* Left illustration panel */}
        <div className="login-left">
          <div className="brand">
            <span className="brand-dot" />
            <span className="brand-name">CampusAI</span>
          </div>

          <div className="illus-content">
            <div className="illus-badge">
              {activeTab === "student" ? "🎓 Student Portal" : "🛡️ Admin Portal"}
            </div>
            <h2 className="illus-heading">
              {activeTab === "student"
                ? <>Achieve Your<br /><span className="illus-accent">Academic Goals</span></>
                : <>Manage Your<br /><span className="illus-accent">Platform</span></>}
            </h2>
            <p className="illus-sub">
              {activeTab === "student"
                ? "Track your courses, assignments, and connect with peers. Your learning journey starts here."
                : "Powerful tools for administrators. Oversee users, content, and system health."}
            </p>

            <div className="illus-cards">
              {activeTab === "student" ? (
                <>
                  <div className="illus-card">
                    <span className="card-icon">📚</span>
                    <div>
                      <div className="card-label">Enrolled Courses</div>
                      <div className="card-value">12 Active</div>
                    </div>
                  </div>
                  <div className="illus-card">
                    <span className="card-icon">⭐</span>
                    <div>
                      <div className="card-label">Average Grade</div>
                      <div className="card-value">A · 94%</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="illus-card">
                    <span className="card-icon">👥</span>
                    <div>
                      <div className="card-label">Total Users</div>
                      <div className="card-value">3,482</div>
                    </div>
                  </div>
                  <div className="illus-card">
                    <span className="card-icon">✅</span>
                    <div>
                      <div className="card-label">System Status</div>
                      <div className="card-value">All Operational</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="illus-figure">
            {activeTab === "student" ? <StudentIcon /> : <AdminIcon />}
            <div className="figure-ring" />
          </div>
        </div>

        {/* Right form panel */}
        <div className="login-right">
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === "student" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("student")}
            >
              <span className="tab-icon">🎓</span> Student
            </button>
            <button
              className={`tab-btn ${activeTab === "admin" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              <span className="tab-icon">🛡️</span> Admin
            </button>
            <div className={`tab-slider ${activeTab === "admin" ? "slider-right" : ""}`} />
          </div>

          <div className="forms-viewport">
            <div className={`forms-track ${activeTab === "admin" ? "slide-left" : ""}`}>
              
              {/* STUDENT FORM */}
              <div className="form-panel">
                <GlareHover
                  glareColor="#a78bfa"
                  glareOpacity={0.18}
                  glareAngle={-30}
                  glareSize={280}
                  transitionDuration={700}
                  playOnce={false}
                  style={{ borderRadius: "20px", width: "100%" }}
                >
                  <div className="form-card">
                    <div className="form-header">
                      <h3 className="form-title">Welcome back!</h3>
                      <p className="form-sub">Sign in to your student account</p>
                    </div>

                    <div className="divider"><span>or sign in with email</span></div>

                    <label className="field-label">Email Address</label>
                    <div className="input-wrap">
                      <span className="input-icon">✉️</span>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="you@university.edu"
                        value={studentForm.email}
                        onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                      />
                    </div>

                    <label className="field-label" style={{ marginTop: 18 }}>Password</label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input
                        className="form-input"
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        value={studentForm.password}
                        onChange={e => setStudentForm({ ...studentForm, password: e.target.value })}
                      />
                      <button className="eye-btn" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                        {showPass ? "🙈" : "👁️"}
                      </button>
                    </div>

                    <div className="form-row">
                      <label className="remember-label">
                        <input
                          type="checkbox"
                          className="remember-check"
                          checked={studentForm.remember}
                          onChange={e => setStudentForm({ ...studentForm, remember: e.target.checked })}
                        />
                        Remember me
                      </label>
                      <a className="forgot-link" href="#">Forgot password?</a>
                    </div>

                    <button 
                      className="submit-btn student-btn"
                      onClick={handleStudentLogin}
                      disabled={isLoading}
                    >
                      <span>{isLoading ? "Signing In..." : "Sign In"}</span>
                      <span className="btn-arrow">{isLoading ? "" : "→"}</span>
                    </button>

                    {message && (
                      <div className={`message ${message.includes("successful") ? "success-msg" : "error-msg"}`}>
                        {message}
                      </div>
                    )}

                    <p className="signup-link">
                      New student? <a href="#">Create an account</a>
                    </p>
                  </div>
                </GlareHover>
              </div>

              {/* ADMIN FORM */}
              <div className="form-panel">
                <GlareHover
                  glareColor="#818cf8"
                  glareOpacity={0.18}
                  glareAngle={-30}
                  glareSize={280}
                  transitionDuration={700}
                  playOnce={false}
                  style={{ borderRadius: "20px", width: "100%" }}
                >
                  <div className="form-card admin-card">
                    <div className="form-header">
                      <h3 className="form-title">Admin Access</h3>
                      <p className="form-sub">Restricted — authorized personnel only</p>
                    </div>

                    <label className="field-label">Username</label>
                    <div className="input-wrap">
                      <span className="input-icon">👤</span>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="admin_username"
                        value={adminForm.username}
                        onChange={e => setAdminForm({ ...adminForm, username: e.target.value })}
                      />
                    </div>

                    <label className="field-label" style={{ marginTop: 18 }}>Password</label>
                    <div className="input-wrap">
                      <span className="input-icon">🔒</span>
                      <input
                        className="form-input"
                        type="password"
                        placeholder="Enter your password"
                        value={adminForm.password}
                        onChange={e => setAdminForm({ ...adminForm, password: e.target.value })}
                      />
                    </div>

                    <button 
                      className="submit-btn admin-btn"
                      onClick={handleAdminLogin}
                      disabled={isLoading}
                    >
                      <span>{isLoading ? "Signing In..." : "Secure Sign In"}</span>
                      <span className="btn-arrow">{isLoading ? "" : "→"}</span>
                    </button>

                    {message && (
                      <div className={`message ${message.includes("successful") ? "success-msg" : "error-msg"}`}>
                        {message}
                      </div>
                    )}

                    <p className="signup-link" style={{ color: "#94a3b8" }}>
                      Having trouble? <a href="#" style={{ color: "#818cf8" }}>Contact IT Support</a>
                    </p>
                  </div>
                </GlareHover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

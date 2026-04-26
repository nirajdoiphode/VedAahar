import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    onLogin(email.trim(), password, navigate, from);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #c8f7dc, #ffe0b2, #ffd6cc)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="d-flex w-100"
        style={{
          maxWidth: "900px",
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {/* LEFT SECTION - LOGIN */}
        <div
          className={`p-4 p-md-5 ${error ? "shake" : ""}`}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="text-center mb-4">
            <h2 style={{ color: "#ff7f50", fontWeight: "700" }}>
              🌿 VedaAhar
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              Personalized Ayurvedic Meal Planner
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                style={{ borderRadius: "12px", padding: "10px" }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div
                className="d-flex align-items-center"
                style={{ borderRadius: "12px", border: "1px solid #ddd" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-0"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#ffe0b2" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-bold"
              style={{
                background: "linear-gradient(90deg, #0a4221, #ff9f43)",
                color: "white",
                padding: "10px",
                borderRadius: "25px",
              }}
            >
              Login
            </button>
          </form>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password" style={{ color: "#2ecc71" }}>
              Forgot Password?
            </Link>
            <Link to="/signup" style={{ color: "#ff7f50" }}>
              Sign Up
            </Link>
          </div>

          <p className="text-center mt-4" style={{ fontSize: "0.75rem", color: "#666" }}>
            Eat Healthy • Live Ayurvedic 🌿
          </p>
        </div>

        {/* RIGHT SECTION - IMAGE */}
        <div
          className="d-none d-md-block"
          style={{
            flex: 1,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604908176997-125f25cc6f3d')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "rgba(10,66,33,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div>
              <h3 style={{ fontWeight: "700" }}>
                Ayurvedic Lifestyle 🌿
              </h3>
              <p>
                Balance your body with personalized meal plans inspired by Ayurveda.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        input:focus {
          border-color: #2ecc71 !important;
          box-shadow: 0 0 5px rgba(46,204,113,0.5);
        }

        .shake {
          animation: shake 0.3s;
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

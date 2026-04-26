import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [personalGoal, setPersonalGoal] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.bodyType) {
      setBodyType(location.state.bodyType);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Register button clicked");

    if (!bodyType) {
      setError("Please calculate your Prakriti first 🌿");
      return;
    }

    if (!personalGoal) {
      setError("Please select your personal goal");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      console.log("Sending signup data:", {
        name,
        email,
        password,
        bodyType,
        personalGoal
      });

     const response = await axios.post(
  "http://localhost:8080/info/addUser",
  {
    username: name,
    email: email,
    password: password,
    prakriti: bodyType,
    healthGoal: personalGoal
  }
);

      if (response.data === true) {
        alert("✅ Account created successfully!");
        navigate("/login");
      } else {
        setError("User already exists");
      }

    } catch (err) {
      console.error("Signup API error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b2f7c1, #ffd6a5, #ffc6d9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >

      <div
        className="d-flex shadow-lg"
        style={{
          width: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#ffffff",
        }}
      >

        {/* LEFT PANEL */}
        <div
          style={{
            width: "40%",
            background: "linear-gradient(180deg, #2ecc71, #ff9f43, #ff6fa5)",
            color: "#fff",
            padding: "60px 35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3 className="fw-bold mb-4">Prakriti Calculator 🌿</h3>

          <p style={{ fontSize: "14px", lineHeight: "1.7" }}>
            Discover your Ayurvedic body constitution
            (Vata, Pitta, Kapha) to receive personalized
            diet recommendations.
          </p>

          <div
            className="mt-4 p-3 text-center"
            style={{
              backgroundColor: "#ffffff",
              color: "#2ecc71",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {bodyType ? bodyType : "Not Calculated"}
          </div>

          <button
            className="btn mt-4 fw-bold"
            style={{
              backgroundColor: "#ffffff",
              color: "#ff6fa5",
              borderRadius: "30px",
            }}
            onClick={() => navigate("/quiz")}
          >
            Take Quiz
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            width: "60%",
            padding: "60px 50px",
          }}
        >

          <h3 className="fw-bold mb-4" style={{ color: "#ff6fa5" }}>
            Create Account
          </h3>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label small fw-semibold">
                What should we call you? ⭐
              </label>

              <input
                type="text"
                className="form-control rounded-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>


            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Email
              </label>

              <input
                type="email"
                className="form-control rounded-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>


            {/* Personal Goal Dropdown */}

            <div className="mb-3">
              <label className="form-label small fw-semibold">
                Personal Goal
              </label>

              <div className="dropdown">

                <button
                  className="btn btn-light dropdown-toggle w-100 text-start"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{
                    borderRadius: "25px",
                    border: "1px solid #ccc",
                    padding: "8px",
                    backgroundColor: "#f8f9fa"
                  }}
                >
                  {personalGoal || "Select your goal"}
                </button>

                <ul className="dropdown-menu w-100">

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => setPersonalGoal("energy")}
                    >
                      Energy
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => setPersonalGoal("weightloss")}
                    >
                      Weight Loss
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => setPersonalGoal("weightgain")}
                    >
                      Weight Gain
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => setPersonalGoal("immunity")}
                    >
                      Immunity
                    </button>
                  </li>

                </ul>
              </div>
            </div>


            <div className="row mb-3">

              <div className="col">
                <label className="form-label small fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control rounded-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>


              <div className="col">
                <label className="form-label small fw-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control rounded-4"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

            </div>


            <button
              type="submit"
              className="btn w-100 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(90deg, #2ecc71, #ff6fa5)",
                color: "#fff",
                padding: "10px",
              }}
            >
              Register
            </button>

          </form>


          <div className="mt-3">

            <span style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#ff6fa5", fontWeight: "bold" }}
              >
                Login
              </Link>
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
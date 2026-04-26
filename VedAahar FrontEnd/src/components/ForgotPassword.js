import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const [otpVerified, setOtpVerified] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(""); // "", "success", "error"

  // 🔵 STEP 1 - SEND OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/info/forgetPass", { email });

      localStorage.setItem("email", email);
      alert("OTP sent to your email");

      setStep(2);
      setMessage("");
    } catch (error) {
      setMessage("Failed to send OTP.");
    }
  };

  // 🟢 VERIFY OTP BUTTON
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/info/VerifyOtp",
        {
          email: localStorage.getItem("email"),
          otp,
        }
      );

      if (response.data === true) {
        setOtpVerified(true);
        setVerifyStatus("success");
        setMessage("OTP Verified Successfully!");
      } else {
        setVerifyStatus("error");
        setMessage("Invalid OTP.");
      }
    } catch (error) {
      setVerifyStatus("error");
      setMessage("Error verifying OTP.");
    }
  };

  // 🔴 RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      setMessage("Please verify OTP first.");
      return;
    }

    // ✅ Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "Password must be at least 8 characters, include 1 uppercase and 1 number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    console.log("Email:", localStorage.getItem("email"));
    console.log("Password:", newPassword);
    await axios.post("http://localhost:8080/info/resetPassword", {
      email: localStorage.getItem("email"),
      password: newPassword,
    });

    // 🔗 Call backend reset API here
    setMessage("Password successfully changed!");
  };

  return (
    <div className="container mt-5">
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Forgot Password</h3>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100">Submit</button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <label>Enter OTP</label>
            <div className="mb-3 d-flex gap-2">
              <input
                type="text"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                className={`btn ${
                  verifyStatus === "success"
                    ? "btn-success"
                    : verifyStatus === "error"
                    ? "btn-danger"
                    : "btn-primary"
                }`}
              >
                {verifyStatus === "success"
                  ? "Verified"
                  : verifyStatus === "error"
                  ? "Invalid"
                  : "Verify"}
              </button>
            </div>

            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!otpVerified}
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!otpVerified}
              />
            </div>

            <button className="btn btn-primary w-100" disabled={!otpVerified}>
              Change Password
            </button>
          </form>
        )}

        {message && (
          <div className="alert alert-info mt-3 text-center">
            <b>{message}</b>
          </div>
        )}
      </div>
    </div>
  );



}
  const styles = {

    backBtn: {
  position: "absolute",
  left: "30px",
  top: "100px",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#2e7d32",
  color: "white",
  cursor: "pointer",
  fontWeight: "600"
}};
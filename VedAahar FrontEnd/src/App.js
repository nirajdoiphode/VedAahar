import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import MealPlanner from "./components/MealPlanner";
import GetMealPage from "./components/GetMealPage";
import ForgotPassword from "./components/ForgotPassword";
import Quiz from "./components/Quiz";

import VegMealPage from "./components/VegMealPage";
import NonVegMealPage from "./components/NonVegMealPage";
import FastingMealPage from "./components/FastingMealPage";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppLayout() {
  const location = useLocation();
  return location.pathname === "/login" ? null : <Footer />;
}

function App() {
  // 🔁 Auto update timer
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    window.addEventListener("click", updateActivity);
    window.addEventListener("keypress", updateActivity);

    return () => {
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keypress", updateActivity);
    };
  }, []);

  // ⏳ Auto logout after 30 mins of inactivity
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity) {
        const inactiveTime = Date.now() - lastActivity;
        const limit = 30 * 60 * 1000; // 30 minutes
        if (inactiveTime > limit) {
          alert("Session expired");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    }, 60000); // check every 1 minute
    return () => clearInterval(checkInactivity);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = async (email, password, navigate, from) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/info/validateUser",
        { email, password }
      );

      console.log("Login response:", response.data);
      if (response.data.status === true) {
        const { email, prakriti, username } = response.data;
        localStorage.setItem("email", email);
        localStorage.setItem("prakriti", prakriti);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("lastActivity", Date.now());

        console.log("User data stored in browser");

        setIsLoggedIn(true);
        //alert("✅ Login successful!");
        toast.success("Login Successfull")

        navigate(from || "/");
      } else {
        //alert("❌ Invalid credentials");
         toast.success("Login Failed")
      }
    } catch (error) {
      console.error(error);
      //alert("⚠️ Server error.");
      toast.error("Server error")
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    localStorage.clear();

    //navigate("/login");
    //alert("Logged out!");
  
    toast.success("Logged out successfully")
     window.location.href = "/";
  };

  return (
    
    <Router>
      <Toaster position="center" reverseOrder={false} gutter={20} containerStyle={{ bottom: 120 }} toastOptions={{ duration: 3000 }}/>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <main style={{ minHeight: "80vh", paddingTop: "65px" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />

          {/* 🍽️ Get Meal (NOW PUBLIC - FIX APPLIED) */}
          <Route
            path="/get-meal"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <GetMealPage />
              </ProtectedRoute>
            }
          />

          <Route path="/veg-meal" element={<VegMealPage />} />

          <Route path="/non-veg-meal" element={<NonVegMealPage />} />

          <Route path="/fasting-meal" element={<FastingMealPage />} />

          <Route
            path="/meal/:type"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MealPlanner />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/quiz" element={<Quiz />} />

          {/* <Route
            path="/quiz"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Quiz />
              </ProtectedRoute>
            }
          /> */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <AppLayout />
    </Router>
  );
}

export default App;

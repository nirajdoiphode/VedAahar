import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaAppleAlt, FaSun, FaSeedling, FaStar } from "react-icons/fa";

const Hero = () => {
  const ayurColors = ["#8BC34A", "#CDDC39", "#FFEB3B", "#FF9800", "#795548", "#A1887F"];

  // Meal / Ayurveda images
  const mealImages = [
    "https://img.icons8.com/color/48/000000/bowl.png",
    "https://img.icons8.com/color/48/000000/spice.png",
    "https://img.icons8.com/color/48/000000/herb.png",
    "https://img.icons8.com/color/48/000000/curry.png",
    "https://img.icons8.com/color/48/000000/tea.png"
  ];

  // Create floating items (mix of icons and images)
  const floatingItems = [...Array(60)].map((_, i) => {
    if (i % 3 === 0) {
      return (
        <img
          key={i}
          src={mealImages[i % mealImages.length]}
          alt="meal-icon"
          className="floating-item"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${25 + Math.random() * 35}px`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 20}s`,
          }}
        />
      );
    } else {
      const icons = [FaLeaf, FaAppleAlt, FaSun, FaSeedling, FaStar];
      const IconComponent = icons[i % icons.length];
      return (
        <IconComponent
          key={i}
          className="floating-item"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 30}px`,
            color: ayurColors[Math.floor(Math.random() * ayurColors.length)],
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${12 + Math.random() * 20}s`,
          }}
        />
      );
    }
  });

  return (
    <div
      className="hero-container"
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(-45deg, #FFE0B2, #FFCCBC, #F8BBD0, #E1BEE7)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 20s ease infinite",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "50px 20px",
        color: "#333",
      }}
    >
      {/* Floating icons and images */}
      <div className="floating-icons">{floatingItems}</div>
      

      {/* Hero Title */}
      <h1
        style={{
          zIndex: 10,
          position: "relative",
          fontSize: "3rem",
          color: "#4E342E",
          letterSpacing: "2px",
          textTransform: "uppercase",
          animation: "fadeIn 1.5s ease-in-out",
          marginBottom: "1rem",
        }}
      >
        🌿 VedAahar
      </h1>

      {/* Subtitle */}
      
      <p
        style={{
          zIndex: 10,
          position: "relative",
          fontSize: "1.5rem",
          maxWidth: "700px",
          lineHeight: "1.6",
          color: "#5D4037",
          animation: "fadeIn 2.5s ease-in-out",
        }}
      >
        Your <span style={{ fontWeight: "bold", color: "#8BC34A" }}>AI Meal Planner</span> inspired
        by Ayurveda & Indian Rituals ✨ <h1>Helloe</h1>
      </p>
      

      {/* Start Quiz Button */}
      <Link to="/quiz">
        <button
          style={{
            background: "linear-gradient(90deg, #DCEDC8, #F0F4C3)",
            color: "#33691E",
            padding: "14px 40px",
            borderRadius: "50px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            transition: "all 0.4s ease",
            fontSize: "1.2rem",
            zIndex: 10,
            position: "relative",
            marginTop: "20px",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
            e.target.style.background = "linear-gradient(90deg, #AED581, #C5E1A5)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
            e.target.style.background = "linear-gradient(90deg, #DCEDC8, #F0F4C3)";
          }}
        >
          🚀 Start Quiz
        </button>
      </Link>

      {/* Scroll Down Hint */}
      <div
        style={{
          position: "absolute",
          bottom: "25px",
          fontSize: "2rem",
          animation: "bounce 2s infinite",
          color: "#4E342E",
          zIndex: 10,
        }}
      >
        ↓
      </div>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
            60% { transform: translateY(-6px); }
          }

          @keyframes floatUp {
            0% { transform: translateY(110vh) translateX(0) rotate(0deg); opacity: 0; }
            25% { transform: translateY(75vh) translateX(10px) rotate(90deg); opacity: 0.6; }
            50% { transform: translateY(50vh) translateX(-10px) rotate(180deg); opacity: 0.8; }
            75% { transform: translateY(25vh) translateX(10px) rotate(270deg); opacity: 0.6; }
            100% { transform: translateY(-20vh) translateX(0) rotate(360deg); opacity: 0; }
          }

          .floating-icons {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }

          .floating-item {
            position: absolute;
            bottom: -50px;
            animation-name: floatUp;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Hero;

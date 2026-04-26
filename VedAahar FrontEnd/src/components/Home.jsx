import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Features from "./Features";


import {
  FaLeaf,
  FaSeedling,
  FaAppleAlt,
  FaStar,
  FaSun,
  FaWater,
} from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();


 const handleGetRitu = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      axios
        .post("http://localhost:8080/api/weather", {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        })
        .then((res) => {
          console.log("Ritu:", res.data);
        });
    });
  };

  const icons = [FaLeaf, FaSeedling, FaAppleAlt, FaStar, FaSun, FaWater];

  const floatingItems = useMemo(() => {
    const count = window.innerWidth < 768 ? 18 : 35;

    return Array.from({ length: count }).map((_, i) => {
      const Icon = icons[i % icons.length];
      return (
        <Icon
          key={i}
          className="floating-item"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 16}px`,
            animationDuration: `${30 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="home-wrapper">
      {/* Floating Background */}
      <div className="animated-icons">{floatingItems}</div>

      {/* ================= HERO ================= */}
      <section id="home" className="home-container">
        <h1 className="vedahar-title">🌿 VedaAhar</h1>

        <div className="hero-line"></div>

        <p className="hero-text">
          Your personalized Ayurvedic nutrition guide for a healthy and balanced
          life.
        </p>

        <div className="hero-buttons">
          
          
            <button
              className="cta-btn secondary"
              onClick={async () => {
                // await handleGetRitu();
                navigate("/get-meal");
              }}
            >
              🍽️ Get Meal Plan
            </button>
        
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features">
        <Features />
      </section>

      {/* ================= JOURNEY TO WELLNESS ================= */}
<section id="how-it-works" className="journey-modern">
  <h2 className="journey-heading">
    Your Journey to <span>Wellness</span>
  </h2>

  <p className="journey-subtext">
    Four simple steps to discover your path to balanced nutrition and optimal health.
  </p>

  <div className="journey-line">
    <div className="journey-item">
      <div className="icon-circle">
        📋
      </div>
      <span className="step-badge">01</span>
      <h3>Take the Quiz</h3>
      <p>
        Answer simple questions about your lifestyle, preferences, and health goals.
      </p>
    </div>

    <div className="journey-item">
      <div className="icon-circle">
        🧠
      </div>
      <span className="step-badge">02</span>
      <h3>Discover Your Prakriti</h3>
      <p>
        Learn your unique body constitution – Vata, Pitta, or Kapha dosha type.
      </p>
    </div>

    <div className="journey-item">
      <div className="icon-circle">
        🍽️
      </div>
      <span className="step-badge">03</span>
      <h3>Get Your Plan</h3>
      <p>
        Receive personalized meal recommendations tailored to your needs.
      </p>
    </div>

    <div className="journey-item">
      <div className="icon-circle">
        ❤️
      </div>
      <span className="step-badge">04</span>
      <h3>Transform Your Life</h3>
      <p>
        Follow your plan and experience improved health, energy & vitality.
      </p>
    </div>
  </div>
</section>


      {/* ================= STYLES ================= */}
      <style>{`
        .home-wrapper {
          position: relative;
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .animated-icons {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .floating-item {
          position: absolute;
          bottom: -60px;
          color: rgba(14, 13, 13, 0.35);
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.4; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }

        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #C8FACC, #B2F7B0, #FFF7C0);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 20px;
          z-index: 1;
        }

        .vedahar-title {
          font-size: clamp(2.2rem, 7vw, 4rem);
          font-weight: 900;
          background: linear-gradient(90deg, #2E7D32, #4CAF50, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 2px;
          animation: floatText 4s ease-in-out infinite;
        }

        .hero-line {
          width: 110px;
          height: 4px;
          background: linear-gradient(90deg, #4CAF50, #FFD700);
          margin: 16px 0 30px;
          border-radius: 4px;
        }

        .hero-text {
          max-width: 700px;
          font-size: clamp(1rem, 2.4vw, 1.4rem);
          line-height: 1.7;
          color: #4E342E;
        }

        .hero-buttons {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: 32px;
          justify-content: center;
        }

        .cta-btn {
          padding: 14px 38px;
          font-size: 1.1rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #2E7D32, #6D4C41);
          color: white;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          transition: transform 0.3s ease;
        }

        .cta-btn.secondary {
          background: linear-gradient(135deg, #FFD54F, #FFB300);
          color: #4E342E;
        }

        .cta-btn:hover {
          transform: scale(1.07);
        }

        @keyframes floatText {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
          /* ===== JOURNEY TO WELLNESS (MODERN) ===== */
.journey-modern {
  padding: 100px 20px;
  background: #faf8f2;
  text-align: center;
}

.journey-heading {
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800;
  color: #173f2f;
}

.journey-heading span {
  color: #e7a33e;
}

.journey-subtext {
  max-width: 760px;
  margin: 16px auto 70px;
  color: #5f7c6c;
  font-size: 1.05rem;
}

.journey-line {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  position: relative;
}

.journey-line::before {
  content: "";
  position: absolute;
  top: 60px;
  left: 5%;
  right: 5%;
  height: 2px;
  background: #d9e6dc;
  z-index: 0;
}

.journey-item {
  background: transparent;
  position: relative;
  z-index: 1;
}

.icon-circle {
  width: 110px;
  height: 110px;
  margin: 0 auto 22px;
  border-radius: 50%;
  border: 3px solid #d9e6dc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: #173f2f;
  background: #ffffff;
}

.step-badge {
  position: absolute;
  top: 15px;
  right: 40px;
  background: #e7a33e;
  color: #173f2f;
  font-weight: 700;
  font-size: 0.9rem;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border-radius: 50%;
}

.journey-item h3 {
  margin: 14px 0 10px;
  font-size: 1.25rem;
  color: #173f2f;
}

.journey-item p {
  font-size: 0.95rem;
  color: #5f7c6c;
  line-height: 1.6;
  max-width: 260px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 900px) {
  .journey-line {
    grid-template-columns: 1fr;
  }

  .journey-line::before {
    display: none;
  }

  .step-badge {
    right: 50%;
    transform: translateX(50%);
  }
}

      `}</style>
    </div>
  );
};

export default Home;

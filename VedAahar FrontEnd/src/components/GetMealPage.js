import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const GetMealPage = () => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [mealType, setMealType] = useState("");
  const [days, setDays] = useState(() => {
  return Number(localStorage.getItem("mealDays")) || 3;
});

  const handleConfirm = () => {
  // ✅ save before navigating
  localStorage.setItem("mealDays", String(days));

  setShowModal(false);

  if (mealType === "veg") navigate(`/veg-meal?days=${days}`);
  if (mealType === "non-veg") navigate(`/non-veg-meal?days=${days}`);
  if (mealType === "fasting") navigate(`/fasting-meal?days=${days}`);
};

  const goToMeal = (type) => {
     if (type === "fasting") {
    navigate("/fasting-meal");
    return;
  }
    setMealType(type);
    setShowModal(true);
  };

  // Card animation (stagger)
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("show");
      }, i * 150);
    });
  }, []);

  return (
    <>
      <section style={styles.section}>
        {/* ===== Background Animation ===== */}
        <div className="bg-animation">
          <div className="blob"></div>
          <div className="blob"></div>
        </div>

        {/* ===== Content ===== */}
        <div style={styles.container}>
          <h2 className="fade-in" style={styles.title}>
            🍽️ Choose Your Meal Plan
          </h2>

          <p className="fade-in delay" style={styles.subtitle}>
            Select your preference and get personalized meals
          </p>

          <div style={styles.grid}>
            {/* Veg */}
            <div
              className="card"
              style={styles.card}
              onClick={() => goToMeal("veg")}
            >
              <div style={styles.icon}>🌱</div>
              <h3 style={styles.cardTitle}>Veg Meal</h3>
              <p style={styles.cardText}>Pure vegetarian balanced diet</p>
            </div>

            {/* Non-Veg */}
            <div
              className="card"
              style={styles.card}
              onClick={() => goToMeal("non-veg")}
            >
              <div style={styles.icon}>🍗</div>
              <h3 style={styles.cardTitle}>Non-Veg Meal</h3>
              <p style={styles.cardText}>Protein-rich healthy options</p>
            </div>

            {/* Fasting */}
            <div
              className="card"
              style={{ ...styles.card, ...styles.fasting }}
              onClick={() => goToMeal("fasting")}
            >
              <div style={styles.icon}>🕉️</div>
              <h3 style={styles.cardTitle}>Fasting Meal</h3>
              <p style={styles.cardText}>Satvik & vrat-friendly meals</p>
            </div>
          </div>
        </div>

        {/* ===== CSS ===== */}
        <style>{`
        /* ===== BACKGROUND ===== */
        .bg-animation {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .bg-animation::before {
          content: "";
          position: absolute;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            #e8f5e9,
            #fffde7,
            #e1f5fe,
            #fce4ec,
            #f3e5f5
          );
          animation: gradientMove 18s ease infinite;
        }

        .bg-animation::after {
          content: "";
          position: absolute;
          width: 450px;
          height: 450px;
          background: rgba(46, 125, 50, 0.15);
          border-radius: 50%;
          top: 15%;
          left: 10%;
          animation: float1 12s ease-in-out infinite;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
        }

        .blob:nth-child(1) {
          width: 350px;
          height: 350px;
          background: rgba(255, 193, 7, 0.2);
          bottom: 10%;
          right: 10%;
          animation: float2 14s ease-in-out infinite;
        }

        .blob:nth-child(2) {
          width: 250px;
          height: 250px;
          background: rgba(33, 150, 243, 0.15);
          top: 50%;
          left: 50%;
          animation: float3 16s ease-in-out infinite;
        }

        @keyframes gradientMove {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-30%, -20%); }
          100% { transform: translate(0, 0); }
        }

        @keyframes float1 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }

        @keyframes float2 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(40px); }
        }

        @keyframes float3 {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(-40px); }
        }

        /* ===== TEXT ANIMATION ===== */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }

        .fade-in.delay {
          animation-delay: 0.3s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ===== CARD ANIMATION ===== */
        .card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.4s ease;
        }

        .card.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
      `}</style>
      </section>

{showModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <h2 className="modal-title">✨ Choose Your Plan</h2>
      <p className="modal-subtitle">How many days do you want meals for?</p>

      <div className="days-options">
        {[1, 2, 3].map((d) => (
          <button
            key={d}
            className={`day-btn ${days === d ? "active" : ""}`}
            onClick={() => setDays(d)}
          >
            {d}
            <span>Day{d > 1 && "s"}</span>
          </button>
        ))}
      </div>

      <div className="modal-actions">
        <button className="confirm-btn" onClick={handleConfirm}>
          🚀 Confirm
        </button>
        <button className="cancel-btn" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


<style>{`
       /* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Card (glass effect) */
.modal-card {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
  padding: 35px 30px;
  border-radius: 24px;
  width: 340px;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  animation: popIn 0.35s ease;
}

/* Animation */
@keyframes popIn {
  from {
    transform: translateY(30px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Title */
.modal-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2e7d32;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-top: 6px;
}

/* Days */
.days-options {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
}

.day-btn {
  flex: 1;
  margin: 0 6px;
  padding: 14px 0;
  border-radius: 14px;
  border: none;
  background: linear-gradient(145deg, #f1f1f1, #e0e0e0);
  cursor: pointer;
  transition: all 0.25s ease;
  font-weight: 600;
  font-size: 1.2rem;
}

.day-btn span {
  display: block;
  font-size: 0.7rem;
  color: #777;
}

.day-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
}

/* Active */
.day-btn.active {
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
  color: white;
  box-shadow: 0 10px 25px rgba(46, 125, 50, 0.4);
}

/* Actions */
.modal-actions {
  display: flex;
  gap: 10px;
}

/* Confirm */
.confirm-btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #2e7d32, #66bb6a);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.confirm-btn:hover {
  transform: scale(1.05);
}

/* Cancel */
.cancel-btn {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #e0e0e0;
  cursor: pointer;
  transition: 0.2s;
}

.cancel-btn:hover {
  background: #d5d5d5;
}
      `}</style>
    </>
  );
};

export default GetMealPage;

/* ===== STYLES ===== */
const styles = {
  
  section: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    fontFamily: "Poppins, sans-serif",
  },

  container: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "950px",
    width: "100%",
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2e7d32",
  },

  subtitle: {
    marginTop: "10px",
    marginBottom: "40px",
    color: "#666",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    padding: "30px 20px",
    borderRadius: "18px",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
  },

  fasting: {
    background: "rgba(255,243,205,0.7)",
  },

  icon: {
    fontSize: "2.5rem",
    marginBottom: "12px",
  },

  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },

  cardText: {
    fontSize: "0.9rem",
    color: "#777",
    marginTop: "6px",
  },
};

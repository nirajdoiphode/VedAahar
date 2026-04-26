import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const NonVegMealPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const alertShown = useRef(false);
  const [mealPlan, setMealPlan] = useState(null);
  
  useEffect(() => {
    if (!alertShown.current) {
     // alert("Please wait... Generating your Non-Veg Meal Plan 🍗");
      alertShown.current = true;
    }
  }, []);
  const rawDays = localStorage.getItem("mealDays");
  let days = Number(rawDays);

  if (!days || days < 1) {
    days = 3;
  }

  // ✅ API CALL
  useEffect(() => {
    async function fetchMealPlan() {
  try {
    const prakriti = localStorage.getItem("prakriti");
    const email = localStorage.getItem("email");

    const permission=await navigator.permissions.query({ name: "geolocation" });
        if(permission.state==="denied" || permission.state==="prompt"){
          toast.error("Location access denied. Please allow location access to get Proper meal plans.");
        }
    // ✅ get location properly (WAIT for it)
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log("Location:", lat, lon);

    const response = await axios.post(
      "http://localhost:8080/api/generate-meal",
      {
        email: email,
        prakriti: prakriti,
        day_type: "nonveg",
        days: days,
        lati: lat,      // ✅ FIXED KEY
        longi: lon,      // ✅ FIXED KEY
      }
    );

    setMealPlan(response.data.mealPlan);

  } catch (error) {
    console.log("Backend error:", error);
  }
}

    fetchMealPlan();
  }, [days]);

  // 🔥 LOADING SCREEN WITH FLOATING ICONS
  if (!mealPlan) {
    return (
      <div style={styles.loadingPage}>
        <div style={styles.iconContainer}>
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              style={{
                ...styles.icon,
                left: `${Math.random() * 100}%`,
                fontSize: `${18 + Math.random() * 20}px`,
                animation: `floatUp ${8 + Math.random() * 8}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {
                ["🍗", "🍖", "🥩", "🍳", "🍲", "🔥"][
                  Math.floor(Math.random() * 6)
                ]
              }
            </span>
          ))}
        </div>

        <h2 style={styles.loadingText}>
          Generating your Non-Veg Meal Plan 🍗...
        </h2>

        <style>{animations}</style>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* 🔥 FLOATING ICONS */}
      <div style={styles.iconContainer}>
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            style={{
              ...styles.icon,
              left: `${Math.random() * 100}%`,
              fontSize: `${18 + Math.random() * 20}px`,
              animation: `floatUp ${8 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {
              ["🍗", "🍖", "🥩", "🍳", "🍲", "🔥"][
                Math.floor(Math.random() * 6)
              ]
            }
          </span>
        ))}
      </div>

      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 style={styles.title}>🍗 Non-Veg Meal Plan</h1>
      <p style={styles.subtitle}>Healthy Ayurvedic non-vegetarian meals</p>

      {Object.entries(mealPlan).map(([day, meals]) => (
        <div key={day} style={styles.daySection}>
          <h2 style={styles.dayTitle}>{day}</h2>

          <div style={styles.mealGrid}>
            {["breakfast", "lunch", "dinner"].map((type, i) => (
              <div
                key={type}
                style={{
                  ...styles.card,
                  animation: "fadeUp 0.6s ease forwards",
                  animationDelay: `${i * 0.2}s`,
                  ...(hoveredCard === `${day}-${type}` ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(`${day}-${type}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h3>
                  {type === "breakfast"
                    ? "🍳 Breakfast"
                    : type === "lunch"
                    ? "🍗 Lunch"
                    : "🥘 Dinner"}
                </h3>

                <p>{meals[type]?.mealName}</p>

                <a
                  href={meals[type]?.recipeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.button}
                >
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style>{animations}</style>
    </div>
  );
};

export default NonVegMealPage;

// 🎨 STYLES
const styles = {
  page: {
    position: "relative",
    overflow: "hidden",
    padding: "100px 20px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(-45deg, #ffe0b2, #ffccbc, #ffcdd2, #ffe0b2)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 12s ease infinite",
  },

  iconContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },

  icon: {
    position: "absolute",
    bottom: "-50px",
    opacity: 0.5,
    zIndex: 1,
  },

  loadingPage: {
    position: "relative",
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(-45deg, #ffe0b2, #ffccbc, #ffcdd2, #ffe0b2)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 12s ease infinite",
  },

  loadingText: {
    fontSize: "1.8rem",
    color: "#c62828",
    fontWeight: "600",
    animation: "fadePulse 2s infinite",
    zIndex: 2,
  },

  backBtn: {
    position: "absolute",
    left: "30px",
    top: "100px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#c62828",
    color: "white",
    cursor: "pointer",
    zIndex: 9999, // 🔥 VERY IMPORTANT
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#b71c1c",
    position: "relative",
    zIndex: 2,
  },

  subtitle: {
    color: "#555",
    marginBottom: "40px",
    position: "relative",
    zIndex: 2,
  },

  daySection: {
    marginBottom: "50px",
    position: "relative",
    zIndex: 2,
  },

  dayTitle: {
    color: "#d84315",
    marginBottom: "20px",
  },

  mealGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    width: "250px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    opacity: 0,
  },

  cardHover: {
    transform: "translateY(-10px)",
  },

  button: {
    marginTop: "10px",
    padding: "8px 14px",
    background: "#c62828",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

// 🎬 ANIMATIONS
const animations = `
@keyframes gradientMove {
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

@keyframes floatUp {
0% {
transform: translateY(0) translateX(0);
opacity: 0;
}
30% {
opacity: 0.7;
}
50% {
transform: translateY(-50vh) translateX(30px);
}
100% {
transform: translateY(-110vh) translateX(-30px);
opacity: 0;
}
}

@keyframes fadeUp {
from {
opacity: 0;
transform: translateY(30px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes fadePulse {
0% { opacity: 0.5; }
50% { opacity: 1; }
100% { opacity: 0.5; }
}
`;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const fastingPlans = {
  phalahar: {
    title: "🍌 Phalahar Fast",
    desc: "Fruit-based fasting for light digestion",
  },
  liquid_fast: {
    title: "🥤 Liquid Fast",
    desc: "Only liquids to detox the body",
  },
  // light: {
  //   title: "🥤 Light Fast",
  //   desc: "Only light foods like milk , curd, nuts, fruits",
  // },
  regular_fast: {
    title: "🍽️ Regular Fast Meal",
    desc: "Simple home food without grains",
  },
};

const FastingMealPage = () => {
  const navigate = useNavigate();
  const [selectedFast, setSelectedFast] = useState("phalahar");
  const [meals, setMeals] = useState([]);
  const alertShown = useRef(false);

  useEffect(() => {
    if (!alertShown.current) {
      //alert("Please wait... Generating your Fasting Meal Plan 🕉️");
      alertShown.current = true;
    }
  }, []);

  const fetchFastingMeal = async (fastType) => {
    try {
      const prakriti = localStorage.getItem("prakriti");
      const username = localStorage.getItem("email");
      // ✅ get location properly (WAIT for it)
      const permission=await navigator.permissions.query({ name: "geolocation" });
        if(permission.state==="denied" || permission.state==="prompt"){
          toast.error("Location access denied. Please allow location access to get Proper meal plans.");
        }
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

      const response = await axios.post(
        "http://localhost:8080/api/generate-fasting-meal",
        {
          email: username,
          prakriti: prakriti,
          fasting_type: fastType,
            lati: lat,      // ✅ FIXED KEY
        longi: lon,      // ✅ FIXED KEY
        }
      );

      setMeals(response.data);
    } catch (error) {
      console.log("Backend error:", error);
    }
  };

  const handleFastClick = (key) => {
    setSelectedFast(key);
    fetchFastingMeal(key);
  };

  return (
    <div style={styles.page}>
      {/* 🕉️ FLOATING FASTING ICONS */}
      <div style={styles.iconContainer}>
        <span style={{ ...styles.icon, left: "10%", animationDelay: "0s" }}>
          🕉️
        </span>
        <span style={{ ...styles.icon, left: "25%", animationDelay: "2s" }}>
          🌿
        </span>
        <span style={{ ...styles.icon, left: "40%", animationDelay: "4s" }}>
          🍎
        </span>
        <span style={{ ...styles.icon, left: "60%", animationDelay: "6s" }}>
          🥥
        </span>
        <span style={{ ...styles.icon, left: "75%", animationDelay: "8s" }}>
          ✨
        </span>
        <span style={{ ...styles.icon, left: "90%", animationDelay: "10s" }}>
          🙏
        </span>
      </div>

      <h1 style={styles.title}>🕉️ Fasting Meal Plans</h1>

      <p style={styles.subtitle}>
        Choose a fasting type to see recommended meals
      </p>

      {/* OPTIONS */}
      <div style={styles.options}>
        {Object.keys(fastingPlans).map((key) => (
          <button
            key={key}
            style={{
              ...styles.optionBtn,
              ...(selectedFast === key ? styles.activeBtn : {}),
            }}
            onClick={() => handleFastClick(key)}
          >
            {fastingPlans[key].title}
          </button>
        ))}
      </div>

      {/* CARD */}
      <div style={styles.card}>
        <h2>{fastingPlans[selectedFast].title}</h2>

        <p style={styles.desc}>{fastingPlans[selectedFast].desc}</p>

        {meals.length === 0 ? (
          <p>Select a fasting type to generate meals.</p>
        ) : (
          <div style={styles.mealList}>
            {meals.map((meal) => (
              <div key={meal.mealId} style={styles.mealCard}>
                <div>
                  <h4 style={styles.mealName}>🍽️ {meal.mealName}</h4>
                </div>

                <a
                  href={meal.recipeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.recipeBtn}
                >
                  View Recipe →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{animations}</style>
       <style>{`
        .mealCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.2);
}

a:hover {
  transform: scale(1.05);
}
       `}</style>
    </div>
  );
};

export default FastingMealPage;

// 🎨 STYLES
const styles = {
  mealList: {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  marginTop: "15px",
},

mealCard: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 16px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #fff8e1, #ffecb3)",
  boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
  transition: "all 0.25s ease",
},

mealName: {
  margin: 0,
  fontSize: "1rem",
  fontWeight: "600",
  color: "#5d4037",
},

recipeBtn: {
  padding: "8px 14px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #ffb300, #ff8f00)",
  color: "white",
  fontWeight: "600",
  textDecoration: "none",
  fontSize: "0.85rem",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
},


  page: {
    position: "relative",
    overflow: "hidden",
    padding: "100px 20px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(-45deg, #fffde7, #f1f8e9, #fff9c4, #f0f4c3)",
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
    bottom: "-40px",
    fontSize: "26px",
    opacity: 0.5,
    animation: "floatUp 12s linear infinite",
  },

  backBtn: {
    position: "absolute",
    left: "30px",
    top: "100px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#6d4c41",
    color: "white",
    cursor: "pointer",
    zIndex: 2,
  },

  title: {
    fontSize: "2.4rem",
    fontWeight: 800,
    color: "#6d4c41",
    position: "relative",
    zIndex: 2,
  },

  subtitle: {
    marginBottom: "35px",
    color: "#555",
    fontSize: "1.05rem",
    position: "relative",
    zIndex: 2,
  },

  options: {
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "35px",
    position: "relative",
    zIndex: 2,
  },

  optionBtn: {
    padding: "12px 20px",
    borderRadius: "22px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "#fff3cd",
    color: "#6d4c41",
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
  },

  activeBtn: {
    background: "linear-gradient(135deg, #ffcc80, #ffb300)",
    transform: "scale(1.05)",
  },

  card: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "28px",
    background: "#ffffff",
    borderRadius: "22px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
    textAlign: "left",
    position: "relative",
    zIndex: 2,
  },

  desc: {
    color: "#777",
    marginBottom: "12px",
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
    transform: translateY(0px);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-110vh);
    opacity: 0;
  }
}
`;

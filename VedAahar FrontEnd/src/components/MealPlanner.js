import React from "react";
import { useParams } from "react-router-dom";

const MealPlanner = () => {
  const { type } = useParams();

  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <h2 style={{ color: "#2e7d32" }}>
        🍃 {type.replace("-", " ").toUpperCase()}
      </h2>

      <ul style={{ listStyle: "none", padding: 0, fontSize: "18px" }}>
        <li>🥣 Warm herbal porridge</li>
        <li>🍚 Steamed rice & vegetables</li>
        <li>🍵 Ayurvedic herbal tea</li>
      </ul>
    </div>
  );
};

export default MealPlanner;

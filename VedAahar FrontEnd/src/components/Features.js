import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const features = [
  { title: "Prakriti Detection", desc: "Discover your Ayurvedic body type: Vata, Pitta, or Kapha.", icon: "🧬" },
  { title: "Ritual Awareness", desc: "Meals aligned with Ekadashi, Navratri, Purnima & more.", icon: "🕉️" },
  { title: "Seasonal Meals", desc: "Food choices based on Grishma, Varsha, Hemant seasons.", icon: "📅" },
  { title: "Personalized Plans", desc: "Customized Satvik, Rasayana, or digestive-light meals.", icon: "🍛" }
];

const Features = () => {
  return (
    <Container id="features" className="my-5 position-relative">
      {/* Soft background decoration */}
      <div className="feature-bg"></div>

      <h2
        className="text-center fw-bold mb-5"
        style={{ color: "#2E7D32", fontSize: "2.7rem", textShadow: "1px 1px 6px rgba(0,0,0,0.15)" }}
      >
        🌟 Features
      </h2>

      <Row className="g-4">
        {features.map((feature, idx) => (
          <Col key={idx} xs={12} sm={6} lg={3}>
            <Card
              className="h-100 text-center border-0 shadow feature-card"
              style={{
                borderRadius: "25px",
                cursor: "pointer",
                background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)",
                transition: "all 0.4s ease",
                overflow: "hidden",
                willChange: "transform"
              }}
            >
              <Card.Body className="d-flex flex-column align-items-center">
                {/* Icon Circle with floating + glow effect */}
                <div
                  className="feature-icon mb-3 d-flex align-items-center justify-content-center"
                  aria-label={feature.title}
                >
                  {feature.icon}
                </div>

                <Card.Title className="fw-bold" style={{ color: "#2E7D32", fontSize: "1.3rem" }}>
                  {feature.title}
                </Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
                  {feature.desc}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>
        {`
          /* Floating Icon Animation + Glow */
          .feature-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2E7D32, #66BB6A);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: #fff;
            animation: float 3s ease-in-out infinite;
            box-shadow: 0 4px 15px rgba(46, 125, 50, 0.35);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            will-change: transform;
          }

          .feature-icon:hover {
            transform: scale(1.25) rotate(10deg);
            box-shadow: 0 10px 30px rgba(46, 125, 50, 0.5);
          }

          /* Feature Card Hover */
          .feature-card:hover {
            transform: translateY(-12px) scale(1.05);
            box-shadow: 0 20px 45px rgba(46, 125, 50, 0.35);
          }

          /* Floating Animation */
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          /* Background with soft gradient overlay */
          .feature-bg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: 
              linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9)),
              url('https://www.transparenttextures.com/patterns/leaf.png') repeat;
            opacity: 0.08;
            pointer-events: none;
            animation: moveLeaves 25s linear infinite;
            z-index: 0;
          }

          @keyframes moveLeaves {
            0% { background-position: 0 0; }
            100% { background-position: 600px 0; }
          }

          .feature-card {
            position: relative;
            z-index: 1;
          }

          @media (min-width: 768px) {
            .feature-icon { width: 90px; height: 90px; font-size: 3rem; }
          }

          @media (max-width: 576px) {
            .feature-card { margin-bottom: 20px; }
            .feature-icon { width: 65px; height: 65px; font-size: 2rem; }
          }
        `}
      </style>
    </Container>
  );
};

export default Features;

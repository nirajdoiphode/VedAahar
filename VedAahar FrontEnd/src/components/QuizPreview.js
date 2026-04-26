import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaClipboardList, FaUtensils, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const QuizPreview = ({ isLoggedIn, onStartQuiz }) => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FaClipboardList size={32} />,
      title: "Take the Quiz",
      badge: "1",
      desc: "Answer 20–25 simple questions to discover if you are Vata, Pitta, or Kapha."
    },
    {
      icon: <FaUtensils size={32} />,
      title: "Get Meal Plan",
      badge: "2",
      desc: "Receive personalized Ayurvedic meal recommendations tailored to your Prakriti."
    },
    {
      icon: <FaLeaf size={32} />,
      title: "Stay Balanced",
      badge: "3",
      desc: "Follow seasonal & ritual-based suggestions to maintain body–mind harmony."
    }
  ];

  // ✅ UPDATED HANDLER
  const handleStartQuiz = () => {
    if (isLoggedIn) {
      onStartQuiz(); // goes to /quiz
    } else {
      navigate("/login", {
        state: { from: { pathname: "/quiz" } }
      });
    }
  };

  return (
    <Container id="quiz" className="my-5 position-relative">
      {/* Decorative background layer */}
      <div className="quiz-bg"></div>

      <h2
        className="text-center fw-bold mb-5"
        style={{
          color: "#2E7D32",
          fontSize: "2.6rem",
          textShadow: "1px 1px 8px rgba(0,0,0,0.15)"
        }}
      >
        🌿 Prakriti Quiz
      </h2>

      <Row className="g-4">
        {steps.map((item, idx) => (
          <Col key={idx} md={4}>
            <Card className="h-100 text-center border-0 shadow-lg quiz-card">
              <Card.Body>
                <div className="icon-circle mb-3">{item.icon}</div>
                <Card.Title className="fw-bold" style={{ color: "#2E7D32" }}>
                  <Badge pill bg="success" className="me-2">
                    {item.badge}
                  </Badge>
                  {item.title}
                </Card.Title>
                <Card.Text className="text-muted">{item.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ✅ BUTTON UPDATED (NO DISABLE) */}
      <div className="text-center mt-5">
        <Button
          variant="success"
          size="lg"
          onClick={handleStartQuiz}
          className="start-quiz-btn"
        >
          {isLoggedIn ? "✨ Start Quiz" : "🔒 Login to Start Quiz"}
        </Button>
      </div>

      {/* 🔥 STYLES (UNCHANGED) */}
      <style>
        {`
          .quiz-bg {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: url('https://www.transparenttextures.com/patterns/leaf.png') repeat;
            opacity: 0.05;
            pointer-events: none;
            animation: moveBg 25s linear infinite;
            z-index: 0;
          }
          @keyframes moveBg {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }

          .quiz-card {
            border-radius: 22px;
            background: linear-gradient(145deg, #E8F5E9, #C8E6C9);
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
          }
          .quiz-card:hover {
            transform: translateY(-12px) scale(1.05);
            box-shadow: 0 20px 45px rgba(76, 175, 80, 0.35);
          }

          .icon-circle {
            width: 75px;
            height: 75px;
            margin: 0 auto 15px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #66BB6A);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 1.8rem;
            animation: floatIcon 3s ease-in-out infinite;
            box-shadow: 0 6px 18px rgba(76, 175, 80, 0.4);
            transition: transform 0.4s, box-shadow 0.4s;
          }
          .icon-circle:hover {
            transform: scale(1.2) rotate(8deg);
            box-shadow: 0 10px 25px rgba(46, 125, 50, 0.5);
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }

          .start-quiz-btn {
            padding: 0.85rem 2.6rem;
            font-size: 1.15rem;
            font-weight: 600;
            border-radius: 50px;
            background: linear-gradient(90deg, #66BB6A, #2E7D32);
            border: none;
            transition: all 0.35s ease;
            z-index: 1;
          }
          .start-quiz-btn:hover {
            transform: scale(1.1);
            background: linear-gradient(90deg, #81C784, #1B5E20);
            box-shadow: 0 12px 28px rgba(76, 175, 80, 0.35);
          }
        `}
      </style>
    </Container>
  );
};

export default QuizPreview;

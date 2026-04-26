import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/quiz/getQuestions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      });
  }, []);

  const handleOptionSelect = (questionId, type) => {
    setAnswers({
      ...answers,
      [questionId]: type,
    });
  };

 const calculateResult = () => {

  if (Object.keys(answers).length !== questions.length) {
    alert("⚠️ Please answer all questions before submitting the quiz.");
    return;
  }

  let vata = 0;
  let pitta = 0;
  let kapha = 0;

  Object.values(answers).forEach((type) => {
    if (type === "VATA") vata++;
    if (type === "PITTA") pitta++;
    if (type === "KAPHA") kapha++;
  });

  let result = "";

  if (vata > pitta && vata > kapha) result = "Vata";
  else if (pitta > vata && pitta > kapha) result = "Pitta";
  else if (kapha > vata && kapha > pitta) result = "Kapha";
  else result = "Mixed";

  navigate("/signup", { state: { bodyType: result } });
};

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🌿 Prakriti Assessment</h2>

      {questions.map((q) => (
        <div key={q.id} className="card p-4 mb-3 shadow-sm">
          <h5>{q.question}</h5>

          <div className="form-check mt-3">
            <input
              type="radio"
              name={`question-${q.id}`}
              className="form-check-input"
              onChange={() => handleOptionSelect(q.id, "VATA")}
            />

            <label className="form-check-label">{q.option1}</label>
          </div>

          <div className="form-check mt-2">
            <input
              type="radio"
              name={`question-${q.id}`}
              className="form-check-input"
              onChange={() => handleOptionSelect(q.id, "PITTA")}
            />

            <label className="form-check-label">{q.option2}</label>
          </div>

          <div className="form-check mt-2">
            <input
              type="radio"
              name={`question-${q.id}`}
              className="form-check-input"
              onChange={() => handleOptionSelect(q.id, "KAPHA")}
            />

            <label className="form-check-label">{q.option3}</label>
          </div>
        </div>
      ))}

      <button
  className="btn btn-success w-100 mt-3"
  disabled={Object.keys(answers).length !== questions.length}
  onClick={calculateResult}
>
  Submit Quiz
</button>
    </div>
  );
}

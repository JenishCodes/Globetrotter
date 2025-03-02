import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getHint, getQuestion } from "../services/question";
import { AuthContext } from "../AuthContext";
import Question from "./Question";

export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setDestination } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [hint, setHint] = useState("");
  const [isCorrect, setIsCorrect] = useState(0);

  useEffect(() => {
    if (location.pathname === "/question") {
      if (question) navigate("/" + question.id);
      else
        getQuestion()
          .then((q) => {
            setQuestion(q);
            navigate("/" + q.id);
          })
          .catch((err) => alert(err.message));
    }
  }, [location]);

  const hanldeHint = () => {
    if (!question) return;
    getHint(question.id)
      .then(setHint)
      .catch((err) => alert(err.message));
  };

  const handleRe = () => {
    setQuestion(null);
    setIsCorrect(0);
    setDestination(null);
    navigate("/question");
  };

  return (
    <div className="start">
      <Link to={"/"}>
        <h2>Globetrotter</h2>
      </Link>

      {location.pathname === "/" ||
      location.pathname.startsWith("/challenge") ? (
        <div>
          <button
            onClick={() => navigate("/question")}
            className={`btn form-field`}
          >
            Play
          </button>
        </div>
      ) : (
        <div>
          <Question q={question} setCorrect={setIsCorrect} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className={`btn btn-option`} onClick={hanldeHint}>
              Hint
            </button>
            {isCorrect !== 0 && (
              <button className={`btn btn-option`} onClick={handleRe}>
                Play Again
              </button>
            )}
          </div>
          <h5>{hint}</h5>
          {isCorrect === 1 && <h3>Correct! 🎉</h3>}
          {isCorrect === -1 && <h3>Incorrect! 😢</h3>}
        </div>
      )}
    </div>
  );
}

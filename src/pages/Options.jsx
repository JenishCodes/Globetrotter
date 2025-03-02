import { useContext } from "react";
import { answerQuestion } from "../services/question";
import { AuthContext } from "../AuthContext";

function Options({ questionId, options, setCorrect }) {
  const { setDestination, score, setScore } = useContext(AuthContext);

  const handleClick = (val) => {
    answerQuestion(questionId, val)
      .then((data) => {
        setCorrect(data.is_correct ? 1 : -1);
        setDestination(data.destination);
        setScore(score + data.points);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          className={`form-field btn`}
          key={index}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

import Options from "./Options";

function Question({ q, setCorrect }) {
  return (
    <div className="question_container">
      <h4>{q?.clue}</h4>
      <Options
        questionId={q?.id}
        options={q?.options}
        setCorrect={setCorrect}
      />
    </div>
  );
}

export default Question;

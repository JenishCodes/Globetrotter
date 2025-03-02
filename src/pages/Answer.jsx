import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./style.css";

export default function Answer() {
  const { destination } = useContext(AuthContext);

  return (
    <div className="answer">
      <h2>Trivia</h2>
      <div>
        <h5>{destination?.trivia_1}</h5>
        <h5>{destination?.trivia_2}</h5>
      </div>
      <h2>Fun Fact</h2>
      <div>
        <h5>{destination?.fun_fact_1}</h5>
        <h5>{destination?.fun_fact_2}</h5>
      </div>
    </div>
  );
}

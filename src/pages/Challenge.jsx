import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getChallenger, getUser } from "../services/user";
import { AuthContext } from "../AuthContext";
import "./style.css";

export default function Challenge() {
  const { isUserSignedIn, score } = useContext(AuthContext);

  const [currentScore, setCurrentScore] = useState(0);
  const [challenger, setChallenger] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/challenge")) {
      let uris = location.pathname.split("/");
      let id = uris[uris.length - 1];

      getChallenger(id)
        .then(setChallenger)
        .catch((err) => alert(err.message));
    }
    if (isUserSignedIn)
      getUser()
        .then((u) => setCurrentScore(u.score))
        .catch((err) => alert(err.message));
  }, [isUserSignedIn]);

  return (
    <div className="challenge">
      <h2>Challenge</h2>
      <div className="challenge-container">
        {challenger && (
          <div className="challenger-section">
            <div className="challenger-name">
              Challenger: {challenger.username}
            </div>
            <div className="challenger-score">Score: {challenger.score || 0}</div>
          </div>
        )}
        <div className="player-section">
          <div className="player-score">Your Score: {currentScore + score}</div>
        </div>
      </div>
    </div>
  );
}

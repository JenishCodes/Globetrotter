import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { createChallenge, getUser } from "../services/user";
import { Modal } from "antd";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
  const { signup, isUserSignedIn, signout } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isUserSignedIn) {
      getUser()
        .then((u) => setUsername(u.username))
        .catch((err) => alert(err.message));
    }
  }, [isUserSignedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(username, password);
  };

  const handleChallenge = () => {
    setIsModalOpen(true);
    createChallenge()
      .then((data) => {
        setLink(API_URL + "/user/challenges/" + data.uri);
        setImage(API_URL + "/user/dynamic-images/" + data.uri + ".png");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="profile">
      {isUserSignedIn ? (
        <div>
          <h3 style={{ marginTop: "16px" }}>Hello {username}</h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="form-field btn" onClick={handleChallenge}>
              Challenge
            </button>
            <button className="form-field btn" onClick={signout}>
              Sign out
            </button>
          </div>
          <Modal
            title="Share Challenge"
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}
            footer={<></>}
          >
            <a href={link} target="_blank">
              {link}
            </a>
            <img src={image} alt={image} />
          </Modal>
        </div>
      ) : (
        <div>
          <h2>Sign In</h2>
          <form className="form d-flex fd-column">
            <input
              className="form-field o-none  bg-transparent c-white"
              type="email"
              placeholder="Email or mobile number"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              className="form-field o-none  bg-transparent c-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />

            <button
              className="form-field  fw-500 c-white"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/tryagain.css";

import background from "../assets/level1/tryagain/2.jpg";
import Backimg from "../assets/level1/backto.png";
import tryagain from "../assets/level1/tryagain/1.png";

function TryAgain() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get('level');
  const round = parseInt(queryParams.get('round'), 10); // Ensure round is an integer

  const tryAgain = async () => {
    try {
      const serverUrl = process.env.REACT_APP_SERVER; // Correctly access the environment variable
      const response = await axios.get(`${serverUrl}/ready-to-read`);
      navigate(`/round1_?level=${level}`);
    } catch (error) {
      console.error("Error signaling ready to read:", error);
    }
  };

  return (
    <div className="tryagain">
      <img
        src={background}
        alt="background"
        className="background-img-tryagain"
      />
      <button
        onClick={() => navigate(`/round${level}_${round}`)}
        className="start-game"
      >
        <img src={tryagain} alt="tryagain" className="tryagain-button" />
      </button>

    </div>
  );
}

export default TryAgain;

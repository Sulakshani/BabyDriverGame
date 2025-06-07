import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/tryagain.css";

import background from "../assets/level1/tryagain/1.jpg";
import celebrate from "../assets/level1/3.png";
import cup from "../assets/level1/4.png";

function Celebrate() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = parseInt(queryParams.get('level'), 10); // Ensure round is an integer

  const tryAgain = async () => {
    try {
      const serverUrl = process.env.REACT_APP_SERVER; // Correctly access the environment variable
      const response = await axios.get(`${serverUrl}/ready-to-read`);
      navigate(`/round${level}`);
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
      <img src={cup} alt="cup" className="cup" />
      <button onClick={() => navigate(`/levelselection${level+ 1}`)} className="start-game">
        <img src={celebrate} alt="tryagain" className="tryagain-button" />
      </button>
    </div>
  );
}

export default Celebrate;

import React from "react";
import { Link } from "react-router-dom";

import "../styles/level01.css";

import Backimg from "../assets/level1/backto.png";
import background from "../assets/level3/background.png";
import play from "../assets/level1/play.png";

function Level2() {
  return (
    <div className="level">
      <Link to="/levelselection3" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <Link
        to={{ pathname: "/countdown", search: "?level=3" }}
        className="start-game"
      >
        <img src={play} alt="play" className="play-2-img" />
      </Link>

      <img src={background} alt="background" className="background-img" />
    </div>
  );
}

export default Level2;

import React from "react";
import { Link } from "react-router-dom";

import "../styles/level01.css";

import Backimg from "../assets/level1/backto.png";
import background from "../assets/level1/background.png";
import play from "../assets/level1/play.png";

function Level1() {
  return (
    <div className="level">
      <Link to="/levelselection1" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <Link
        to={{ pathname: "/countdown", search: "?level=1" }}
        className="start-game"
      >
        <img src={play} alt="play" className="play-img" />
      </Link>

      <img src={background} alt="background" className="background-img" />
    </div>
  );
}

export default Level1;

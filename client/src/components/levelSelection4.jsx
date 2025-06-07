import React from "react";
import { Link } from "react-router-dom";
import "../styles/levelSelection4.css";

import back from "../assets/levelselection/back.png";
import menu from "../assets/levelselection/menu.png";
import idle from "../assets/levelselection/idle.png";
import level1 from "../assets/levelselection/success.png";
import level2 from "../assets/levelselection/success.png";
import level3 from "../assets/levelselection/success.png";
import level4 from "../assets/levelselection/active.png";

function LevelSelection4() {
  return (
    <div className="level-selection">
      <img alt="menu" src={menu} className="menu-image" />
      <img alt="idle" src={idle} className="idle-4-image" />
      <Link to="/level1" className="start-game">
        <img alt="level-1" src={level1} className="level-1-image" />
      </Link>

      <Link to="/level2" className="start-game">
        <img alt="level-2" src={level2} className="level-2-image" />
      </Link>

      <Link to="/level3" className="start-game">
        <img alt="level-3" src={level3} className="level-3-image" />
      </Link>

      <Link to="/level4" className="start-game">
        <img alt="level-4" src={level4} className="level-4-a-image" />
      </Link>

      <img alt="back" src={back} className="back-image" />
    </div>
  );
}

export default LevelSelection4;

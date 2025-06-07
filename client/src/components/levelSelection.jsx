import React from "react";
import { Link } from "react-router-dom";
import "../styles/levelSelection.css";

import back from "../assets/levelselection/back.png";
import menu from "../assets/levelselection/menu.png";
import idle from "../assets/levelselection/idle.png";
import level1a from "../assets/levelselection/active.png";
import level2 from "../assets/levelselection/lock.png";
import level3 from "../assets/levelselection/lock.png";
import level4 from "../assets/levelselection/lock.png";

function LevelSelection() {
  return (
    <div className="level-selection">
      <img alt="menu" src={menu} className="menu-image" />
      <img alt="idle" src={idle} className="idle-1-image" />
      <Link to="/level1" className="start-game">
        <img alt="level-1-active" src={level1a} className="level-1-a-image" />
      </Link>

      <img alt="level-2" src={level2} className="level-2-image" />

      <img alt="level-3" src={level3} className="level-3-image" />

      <img alt="level-4" src={level4} className="level-4-image" />

      <img alt="back" src={back} className="back-image" />
    </div>
  );
}

export default LevelSelection;

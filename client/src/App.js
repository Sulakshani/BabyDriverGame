import "./App.css";
import { Routes, Route } from "react-router-dom";
import Countdown from "./components/Countdown";

import Start from "./components/start";
import Round1_1 from "./components/Round1_1";
import Round1_2 from "./components/round1_2";
import Round1_3 from "./components/Round1_3";
import Round2_1 from "./components/Round2_1";
import Round2_2 from "./components/Round2_2";

import Round3_1 from "./components/Round3_1";
import Round3_2 from "./components/Round3_2";

import Round4_1 from "./components/Round4_1";
import Round4_2 from "./components/Round4_2";

import Tryagain from "./components/tryagain";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Level4 from "./components/Level4";
import Celebrate from "./components/celebrate1";
import LevelSelection from "./components/levelSelection";
import LevelSelection2 from "./components/levelSelection2";
import LevelSelection3 from "./components/levelSelection3";
import LevelSelection4 from "./components/levelSelection4";
import LevelSelection5 from "./components/LevelSelection5";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/levelselection1" element={<LevelSelection />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/round1_1" element={<Round1_1 />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/round1_2" element={<Round1_2 />} />
        <Route path="/tryagain" element={<Tryagain />} />
        <Route path="/round1_3" element={<Round1_3 />} />
        <Route path="/celebrate" element={<Celebrate />} />
        <Route path="/levelselection2" element={<LevelSelection2 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/round2_1" element={<Round2_1 />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/round2_2" element={<Round2_2 />} />
        <Route path="/tryagain" element={<Tryagain />} />

        <Route path="/celebrate" element={<Celebrate />} />
        <Route path="/levelselection3" element={<LevelSelection3 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/round3_1" element={<Round3_1 />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/round3_2" element={<Round3_2 />} />
        <Route path="/tryagain" element={<Tryagain />} />
    
        <Route path="/celebrate" element={<Celebrate />} />
        <Route path="/levelselection4" element={<LevelSelection4 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/round4_1" element={<Round4_1 />} />
        <Route path="/countdown" element={<Countdown />} />
        <Route path="/round4_2" element={<Round4_2 />} />
        <Route path="/tryagain" element={<Tryagain />} />
  
        <Route path="/celebrate" element={<Celebrate />} />
        <Route path="/levelselection5" element={<LevelSelection5 />} />
      </Routes>
    </div>
  );
}

export default App;

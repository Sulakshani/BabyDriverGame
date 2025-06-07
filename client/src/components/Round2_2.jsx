import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/round2.css';
import Backimg from '../assets/level1/backto.png';
import background from '../assets/level1/round2/1.jpg';

import voice0 from '../assets/round2_2/1.mp3'; // Adjust the path as needed
import voice1 from '../assets/round2_2/2.mp3';
import voice2 from '../assets/round2_2/3.mp3';
import voice3 from '../assets/round2_2/4.mp3';
import voice4 from '../assets/round2_2/5.mp3';

function Round2_2() {
  const audioRef = useRef(null);
  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const shapeDictionary = {
    'Dog': '5346F51B',
    'Cat': 'A38F0A1C',
    'Elephant': 'D38E051C',
    'Lion': '239A031C',
    'Horse': '6355DD1B'
  };

  const voices = { voice0, voice1, voice2, voice3, voice4};

  // Generate a random index to select a shape
  const shapeNames = Object.keys(shapeDictionary);
  const randomIndex = Math.floor(Math.random() * shapeNames.length);
  const randomShapeName = shapeNames[randomIndex];
  const randomUUID = shapeDictionary[randomShapeName];

  const sendRandomUUID = async () => {
    try {
      const serverUrl = process.env.REACT_APP_SERVER; // Correctly access the environment variable
      await axios.post(`${serverUrl}/passed-uuid`, { uuid: randomUUID });
    } catch (error) {
      console.error("Error sending the random UUID:", error);
    }
  };

  const fetchUUID = async () => {
    try {
      const serverUrl = process.env.REACT_APP_SERVER; // Correctly access the environment variable
      const response = await axios.get(`${serverUrl}/latest-uuid`);
      const fetchedUUID = response.data.uuid;
      if (fetchedUUID) {
        setUUID(fetchedUUID);
        checkUUID(fetchedUUID);
      }
    } catch (error) {
      console.error("Error fetching the UUID:", error);
    }
  };

  const signalReadyToRead = async () => {
    try {
      const serverUrl = process.env.REACT_APP_SERVER; // Correctly access the environment variable
      await axios.get(`${serverUrl}/ready-to-read`);
      console.log('Signaled ready to read next card');
    } catch (error) {
      console.error('Error signaling ready to read:', error);
    }
  };

  const checkUUID = (fetchedUUID) => {  
    if (fetchedUUID === randomUUID) {
      navigate(`/celebrate?level=2`);
    } else {
      navigate(`/tryagain?level=2&round=2`);
    }
  };

  useEffect(() => {
    signalReadyToRead();
    sendRandomUUID(); // Send the random UUID to the backend when component mounts
    const interval = setInterval(fetchUUID, 500); // Fetch UUID every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);  

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset audio to the start
    }
  };

  const audioControlsStyle = {
    marginTop: "20px",
    textAlign: "center"
  };

  const buttonStyle = {
    marginRight: "10px",
    padding: "15px 25px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "#008000",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px #999",
    transition: "all 0.3s ease",
    outline: "none"
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff9900",
    boxShadow: "0 6px #666"
  };

  const buttonActiveStyle = {
    backgroundColor: "#ff6600",
    boxShadow: "0 2px #666",
    transform: "translateY(4px)"
  };

  const handleMouseOver = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };

  const handleMouseOut = (e) => {
    Object.assign(e.target.style, buttonStyle);
  };

  const handleMouseDown = (e) => {
    Object.assign(e.target.style, buttonActiveStyle);
  };

  const handleMouseUp = (e) => {
    Object.assign(e.target.style, buttonStyle);
  };

  return (
    <div className='level'>
      <img src={background} alt='back' className='background-img-round2' />
      <Link to="/round2_1" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <audio ref={audioRef} src={voices[`voice${randomIndex}`]} />
        <h1>Place the relevant animal on</h1>
        <h1>the plate</h1>
        <div style={audioControlsStyle}>
          <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={playAudio}
          >
            Play
          </button>
          <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={pauseAudio}
          >
            Pause
          </button>
          <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={stopAudio}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Round2_2;

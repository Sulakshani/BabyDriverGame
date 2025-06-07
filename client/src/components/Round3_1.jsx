import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/round1.css";
import Backimg from "../assets/level1/backto.png";
import background from "../assets/level1/round1/1.png";

function Round3_1() {
  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const colorDictionary = {
    'Apple': '0361F21B',
    'Ball': 'A3F4D91B',
    'Cat': 'A38F0A1C',
    'Dog': '5346F51B',
    'Lion': '239A031C',
    'Grapes': 'C37E041C',
    'Train': '405DFD59',
    'Kite': '43ACE91B',
    'Pot': '73F4F71B',
    'Umbrella': '638FE81B'
  };

  const letters = {
    'Apple': "A",
    'Ball': "B",
    'Cat': "C",
    'Dog': "D",
    'Lion': "L",
    'Grapes': "G",
    'Train': "T",
    'Kite': "K",
    'Pot': "P",
    'Umbrella': "U"
  };

  // Generate a random index to select a color
  const colorNames = Object.keys(colorDictionary);
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  // Retrieve the color name associated with the random index
  const randomColorName = colorNames[randomIndex];
  // Retrieve the color UUID associated with the random color name
  const randomUUID = colorDictionary[randomColorName];

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

  useEffect(() => {
    sendRandomUUID(); // Send the random UUID to the backend when component mounts
    const interval = setInterval(fetchUUID, 500); // Fetch UUID every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const checkUUID = (fetchedUUID) => {  
    if (fetchedUUID === randomUUID) {
      navigate(`/round3_2`);
    } else {
      navigate(`/tryagain?level=3&round=1`);
    }
  };

  const letterStyle = {
    fontSize: "120px", // Very big font size
    color: "#ff6600", // Bright color
    textAlign: "center",
    margin: "20px 0",
    textShadow: "2px 2px 5px #000000", // Adding some shadow to make it pop
  };

  return (
    <div className="level">
      <img
        src={background}
        alt="background"
        className="background-img-round1"
      />

      <Link to="/levelselection3" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <h1 style={letterStyle}>{letters[randomColorName]}</h1>
        <h1>Place the relevant object according</h1>
        <h1>the letter</h1>
      </div>
    </div>
  );
}

export default Round3_1;

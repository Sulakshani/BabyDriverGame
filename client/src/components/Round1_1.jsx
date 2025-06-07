import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/round1.css";
import Backimg from "../assets/level1/backto.png";
import background from "../assets/level1/round1/1.png";

function Round1_1() {
  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const colorDictionary = {
    'Red': '239AED1B',
    'Yellow': '3C000749',
    'Purple': '83ECDB1B',
    'Blue': '1CEA314A',
    'Pink': '23B5001C'
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
      navigate(`/round1_2`);
    } else {
      navigate(`/tryagain?level=1&round=1`);
    }
  };

  return (
    <div className="level">
      <img
        src={background}
        alt="background"
        className="background-img-round1"
      />

      <Link to="/levelselection1" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <h1 className="level-text">{randomColorName}</h1>
        <h1>Place the relevant color face </h1>
        <h1>on the plate</h1>
      </div>
    </div>
  );
}

export default Round1_1;

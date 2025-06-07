import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/round2.css';
import Backimg from '../assets/level1/backto.png';
import background from '../assets/level1/round2/1.jpg';

function Round3_2() {

  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const shapeDictionary = {
    'H_USE': '93D0E81B',
    'C_R': '03EEF71B',
    'TR_E': '1C2C5249',
    'PEN_IL': '63D4D01B',
    'FLO_ER': '93B0051C',
    'MI_K': '73D1EE1B',
    'C_AIR': '73B0051C',
    'WIN_OW': '3337041C',
    'PA_ER': '1332FD1B',
    'B_OTHER': 'C3160A1C',
    'TA_LE': 'F35EF31B',
    'CLO_D': "23A3DD1B",
    'CRIC_ET': "0302FF1B",
    'MAN_O': "63BBCC1B",
    'VEH_CLE': "F3 52D61B"
  };

  // Generate a random index to select a color
  const colorNames = Object.keys(shapeDictionary);
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  // Retrieve the color name associated with the random index
  const randomColorName = colorNames[randomIndex];
  // Retrieve the color UUID associated with the random color name
  const randomUUID = shapeDictionary[randomColorName];

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
      const response = await axios.get(`${serverUrl}/ready-to-read`);
      console.log('Signaled ready to read next card');
    } catch (error) {
      console.error('Error signaling ready to read:', error);
    }
  };

  const checkUUID = (fetchedUUID) => {  
    if (fetchedUUID === randomUUID) {
      navigate(`/celebrate?level=3`);
    } else {
      navigate(`/tryagain?level=3&round=2`);
    }
  };
  
  useEffect(() => {
    signalReadyToRead();
    sendRandomUUID(); // Send the random UUID to the backend when component mounts
    const interval = setInterval(fetchUUID, 500); // Fetch UUID every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);  

  const textStyle = {
    fontSize: "80px", // Very big font size
    color: "#ff6600", // Bright color
    textAlign: "center",
    margin: "20px 0",
    textShadow: "2px 2px 5px #000000", // Adding some shadow to make it pop
  };

  return (
    <div className='level'>
      <img src={background} alt='back' className='background-img-round2' />
      <Link to="/round3_1" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <h1 style={textStyle}>{randomColorName.replace(/_/g, "_")}</h1>
        <h1>Place the relevent letter box on</h1>
        <h1>the plate</h1>
      </div>
    </div>
  );
}

export default Round3_2;

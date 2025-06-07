import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/round3.css';
import Backimg from '../assets/level1/backto.png'
import background from '../assets/level1/round3/1.jpg';

function Round3() {

  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const shapeDictionary = {
    'Red Circle': '431A031C',
    'Blue Square': '9C39174A',
    'Greeen Triangle': 'F304E31B',
    'Purple Hexagon': 'E3D5FD1B',
    'Yellow Star': 'F363F21B'
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
      navigate(`/celebrate?level=1`);
    } else {
      navigate(`/tryagain?level=1&round=3`);
    }
  };
  
  useEffect(() => {
    signalReadyToRead();
    sendRandomUUID(); // Send the random UUID to the backend when component mounts
    const interval = setInterval(fetchUUID, 500); // Fetch UUID every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);  

  return (
    <div className='level'>
      <img src={background} alt='back' className='background-img-round2' />
      <Link to="/round1_2" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <h1 className="level-text">{randomColorName}</h1>
        <h1>Place the relevant Box on</h1>
        <h1>the plate</h1>
      </div>
    </div>
  );
}

export default Round3;
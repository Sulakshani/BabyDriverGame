import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/round1.css";
import Backimg from "../assets/level1/backto.png";
import background from "../assets/level1/round1/1.png";

import img1 from '../assets/round4_1/1.png';
import img2 from '../assets/round4_1/2.png';
import img3 from '../assets/round4_1/3.png';
import img4 from '../assets/round4_1/4.png';
import img5 from '../assets/round4_1/5.png';
import img6 from '../assets/round4_1/6.png';
import img7 from '../assets/round4_1/7.png';
import img8 from '../assets/round4_1/8.png';

function Round4_1() {
  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const colorDictionary = {
    '1': 'A3CBE41B',
    '2': '730BF51B',
    '3': 'E3D5D81B',
    '4': 'F39FD71B',
    '5': '6378F51B',
    '6': '40B56E59',
    '7': '2C110749',
    '8': '1C57474A'
  };

  const nums = {
    '1': img1,
    '2': img2,
    '3': img3,
    '4': img4,
    '5': img5,
    '6': img6,
    '7': img7,
    '8': img8
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
      navigate(`/round4_2`);
    } else {
      navigate(`/tryagain?level=4&round=1`);
    }
  };

  return (
    <div className="level">
      <img
        src={background}
        alt="background"
        className="background-img-round1"
      />

      <Link to="/levelselection4" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <img src={nums[randomColorName]} alt="numbers" style={{ height: 400 }} />
        <h1>Count the number of objects</h1>
        
      </div>
    </div>
  );
}

export default Round4_1;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/round2.css';
import Backimg from '../assets/level1/backto.png'
import background from '../assets/level1/round2/1.jpg';

import img0 from  '../assets/round4_2/1.png'
import img1 from  '../assets/round4_2/2.png'
import img2 from  '../assets/round4_2/3.png'
import img3 from  '../assets/round4_2/4.png'
import img4 from  '../assets/round4_2/5.png'

function Round4_2() {

  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const shapeDictionary = {
    '1': '1C57474A',
    '2': '2C110749',
    '3': '40B56E59',
    '4': 'E3D5D81B',
    '5': '6378F51B'
  };

  const shapes = {
    '1': img0,
    '2': img1,
    '3': img2,
    '4': img3,
    '5': img4
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
      await axios.get(`${serverUrl}/ready-to-read`);
      console.log('Signaled ready to read next card');
    } catch (error) {
      console.error('Error signaling ready to read:', error);
    }
  };

  const checkUUID = (fetchedUUID) => {  
    if (fetchedUUID === randomUUID) {
      navigate(`/celebrate?level=4`);
    } else {
      navigate(`/tryagain?level=4&round=2`);
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
      <Link to="/round4_1" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <img src={shapes[randomColorName]} alt="shape" style={{ height: 400, marginTop: 50 }} />
        <h1>Place the relevent answer box </h1>
        <h1>on the plate</h1>
      </div>
    </div>
  );
}

export default Round4_2;

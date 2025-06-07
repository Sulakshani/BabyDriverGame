import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/round1.css";
import Backimg from "../assets/level1/backto.png";
import background from "../assets/level1/round1/1.png";

import img0 from "../assets/round2_1/1.png";
import img1 from "../assets/round2_1/2.png";
import img2 from "../assets/round2_1/3.png";
import img3 from "../assets/round2_1/4.png";
import img4 from "../assets/round2_1/5.png";
import img5 from "../assets/round2_1/6.png";

function Round2_1() {
  const [uuid, setUUID] = useState("");
  const navigate = useNavigate();

  const colorDictionary = {
    Dog: "5346F51B",
    Cat: "A38F0A1C",
    Elephant: "D38E051C",
    Penguin: "13E4F91B",
    Horse: "6355DD1B",
    Dolphin: "7375081C",
  };

  // Generate a random index to select a color
  const colorNames = Object.keys(colorDictionary);
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  // Retrieve the color name associated with the random index
  const randomColorName = colorNames[randomIndex];
  // Retrieve the color UUID associated with the random color name
  const randomUUID = colorDictionary[randomColorName];

  const imageSources = [img0, img1, img2, img3, img4, img5];

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
      navigate(`/round2_2`);
    } else {
      navigate(`/tryagain?level=2&round=1`);
    }
  };

  return (
    <div className="level">
      <img
        src={background}
        alt="background"
        className="background-img-round1"
      />

      <Link to="/levelselection2" className="start-game">
        <img src={Backimg} alt="back" className="back-img" />
      </Link>

      <div className="levelPage">
        <img
          style={{ width: 350 , }}
          src={imageSources[randomIndex]}
          alt="animal"
        />
        <h1>Place the relevent animal suitable</h1>
        <h1>to the shadow</h1>
      </div>
    </div>
  );
}

export default Round2_1;

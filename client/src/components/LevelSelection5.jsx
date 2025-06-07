import React, { useEffect, useRef } from 'react';
import localVideo from '../assets/gameover.mp4';
import '../styles/LevelSelection5.css'; // Create and import a CSS file for custom styles

function LevelSelection5() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.play();// Request fullscreen after play is triggered by user interaction
      document.querySelector('.play-button').style.display = 'none'; // Hide the play button
    }
  };

  return (
    <div className="video-container" onClick={handlePlay}>
      <video
        ref={videoRef}
        autoPlay
        muted
        controls={false}
        width="100%" // Make the video take the full width of the container
        height="100%" // Make the video take the full height of the container
        // Request fullscreen when the video starts playing
      >
        <source src={localVideo} type="video/mp4" />
      </video>
    </div>
  );
}

export default LevelSelection5;

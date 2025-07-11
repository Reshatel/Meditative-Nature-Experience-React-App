import React, { useRef, useEffect, useState } from 'react';
import rainVideo from '../assets/rain4.mp4';
import './RainEffect.css';

const RainEffect = ({ isActive }) => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(isActive);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      setTimeout(() => setFadeOut(false), 50); 
    } else {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 1500);
    }
  }, [isActive]);


  if (!visible) return null;

  return (
    <div className="rain-video-container">
      <video
        ref={videoRef}
        className={`rain-video ${fadeOut ? 'fade-out' : 'fade-in'}`}
        src={rainVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default RainEffect;

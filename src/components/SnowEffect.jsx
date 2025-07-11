import React, { useRef, useEffect, useState } from 'react';
import snowVideo from '../assets/snow.webm';
import './RainEffect.css';

const SnowEffect = ({ isActive, isFading }) => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (isActive || isFading) {
      setVisible(true);
      setTimeout(() => setFadeIn(true), 50);
    } else {
      setFadeIn(false);
      setVisible(false);
    }
  }, [isActive, isFading]);

  if (!visible) return null;

  return (
    <div className="rain-video-container">
      <video
        ref={videoRef}
        className={`rain-video ${isFading ? 'fade-out' : fadeIn ? 'fade-in' : ''}`}
        src={snowVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default SnowEffect;

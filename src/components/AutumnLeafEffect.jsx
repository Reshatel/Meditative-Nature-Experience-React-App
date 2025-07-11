import React, { useRef, useEffect, useState } from 'react';
import autumnLeafVideo from '../assets/autumn-leaves2.webm'; 
import './AutumnLeafEffect.css'; 

const LeafEffect = ({ isActive, isFading }) => {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      setTimeout(() => setFadeIn(true), 50); 
    } else if (!isActive) {
      setFadeIn(false); 
      setTimeout(() => setVisible(false), 1000);
    }
  }, [isActive]);

  if (!visible) return null;

  return (
    <div className="rain-video-container">
      <video
        ref={videoRef}
        className={`rain-video ${fadeIn ? 'fade-in' : 'fade-out'}`}
        src={autumnLeafVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default LeafEffect;

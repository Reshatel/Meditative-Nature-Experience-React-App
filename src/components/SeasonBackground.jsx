import React, { useEffect, useRef } from 'react';
import './SeasonBackground.css';
import forestSummer from '../assets/seasons/summer.jpg';
import forestSpring from '../assets/seasons/spring.jpg';
import forestAutumn from '../assets/seasons/autumn.jpg';
import forestWinter from '../assets/seasons/winter.jpg';

const SeasonBackground = ({ currentSeason }) => {
  const backgroundRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.2;
      const y = e.clientY / innerHeight - 0.2;

      const offsetX = -x * 70; 
      const offsetY = -y * 70 ;

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const images = {
    summer: forestSummer,
    spring: forestSpring,
    autumn: forestAutumn,
    winter: forestWinter,
  };

  return (
    <div className="backgrounds">
      {Object.entries(images).map(([key, src]) => (
        <img
          key={key}
          src={src}
          ref={key === currentSeason ? backgroundRef : null}
          className={`bg-img ${key === currentSeason ? 'active' : ''}`}
          alt={key}
        />
      ))}
    </div>
  );
};

export default SeasonBackground;

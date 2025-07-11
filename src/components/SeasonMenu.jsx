import React, { useState } from 'react';
import './SeasonMenu.css';
import springIcon from '../assets/icons/seasons/spring.png';
import summerIcon from '../assets/icons/seasons/summer.png';
import autumnIcon from '../assets/icons/seasons/autumn.png';
import winterIcon from '../assets/icons/seasons/winter.png';
import sunIcon from '../assets/icons/seasons/sun.png';

const SeasonMenu = ({ onSelectSeason }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);

  const handleSeasonClick = (season) => {
    onSelectSeason(season);
    setOpen(false);
  };

  return (
    <div className="season-menu">
      <button className="season-main-button" onClick={toggleMenu}>
        <img src={sunIcon} alt="menu" className="icon" />
      </button>

      <div className={`season-options-arc ${open ? 'open' : ''}`}>
        <button className="season-btn" onClick={() => handleSeasonClick('spring')}>
          <img src={springIcon} alt="spring" className="icon" />
        </button>
        <button className="season-btn" onClick={() => handleSeasonClick('summer')}>
          <img src={summerIcon} alt="summer" className="icon" />
        </button>
        <button className="season-btn" onClick={() => handleSeasonClick('autumn')}>
          <img src={autumnIcon} alt="autumn" className="icon" />
        </button>
        <button className="season-btn" onClick={() => handleSeasonClick('winter')}>
          <img src={winterIcon} alt="winter" className="icon" />
        </button>
      </div>
    </div>
  );
};


export default SeasonMenu;

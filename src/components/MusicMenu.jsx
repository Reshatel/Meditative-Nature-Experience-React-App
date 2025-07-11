import React, { useState } from 'react';
import './MusicMenu.css';
import musicIcon from '../assets/icons/music.png';
import playIcon from '../assets/icons/play.png';
import pauseIcon from '../assets/icons/pause.png';
import searchIcon from '../assets/icons/search.png';

const MusicMenu = ({ onPlay, onPause, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="music-menu">
      <button className="music-main-button" onClick={() => setOpen(prev => !prev)}>
        <img src={musicIcon} alt="music" />
      </button>

      <div className={`music-options-arc ${open ? 'open' : ''}`}>
        <button className="music-btn" onClick={onPlay}>
          <img src={playIcon} alt="Play" />
        </button>
        <button className="music-btn" onClick={onPause}>
          <img src={pauseIcon} alt="Pause" />
        </button>
        <button className="music-btn" onClick={() => setShowSearch(prev => !prev)}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>

      {showSearch && (
        <div className="music-search-panel">
          <input
            type="text"
            placeholder="Music..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicMenu;

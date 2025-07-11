import React from 'react';
import './SoundButton.css';

const SoundButton = ({ icon, onClick }) => {
  return (
    <button className="sound-button" onClick={onClick}>
      <img src={icon} alt="icon" />
    </button>
  );
};

export default SoundButton;

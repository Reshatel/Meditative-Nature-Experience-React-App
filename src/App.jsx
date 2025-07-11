import React, { useState, useEffect } from 'react';
import './App.css';
import SoundButton from './components/SoundButton';
import RainEffect from './components/RainEffect';
import ReactHowler from 'react-howler';
import FogEffect from './components/FogEffect';
import rainIcon from './assets/icons/rain.png';
import fogIcon from './assets/icons/fog.png';
import birdsIcon from './assets/icons/birds.png';
import forestSpring from './assets/seasons/spring.jpg';
import forestSummer from './assets/seasons/summer.jpg';
import forestAutumn from './assets/seasons/autumn.jpg';
import forestWinter from './assets/seasons/winter.jpg';
import SeasonMenu from './components/SeasonMenu';
import SeasonBackground from './components/SeasonBackground';
import snowIcon from './assets/icons/winter.png';
import SnowEffect from './components/SnowEffect';
import MusicMenu from './components/MusicMenu';
import leafIcon from './assets/icons/leaf.png'; 
import autumnLeafIcon from './assets/icons/autumnLeaf.png';
import LeafEffect from './components/LeafEffect';
import AutumnLeafEffect from './components/AutumnLeafEffect';
import rainSound from './assets/sounds/rain.mp3';
import birdsSound from './assets/sounds/birds.mp3';
import fogSound from './assets/sounds/fog.mp3';





const App = () => {
  const [sounds, setSounds] = useState({
    rain: false,
    birds: false,
    fog: false,
    snow: false,
  });

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rainFading, setRainFading] = useState(false);
  const [season, setSeason] = useState('spring');
  const [snowFading, setSnowFading] = useState(false);
  const [leafActive, setLeafActive] = useState(false);
  const [autumnLeafActive, setAutumnLeafActive] = useState(false);


  // Jamendo API
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = (type) => {
    if (type === 'rain' && sounds.rain) {
      setRainFading(true);
      setTimeout(() => {
        setRainFading(false);
        setSounds((prev) => ({ ...prev, rain: false }));
      }, 400);
    } else if (type === 'snow' && sounds.snow) {
      setSnowFading(true);
      setTimeout(() => {
        setSnowFading(false);
        setSounds((prev) => ({ ...prev, snow: false }));
      }, 1500);
    } else if (type === 'leaf') {
      setLeafActive((prev) => !prev);
    } else if (type === 'autumnLeaf') {
      setAutumnLeafActive((prev) => !prev);
    } else {
      setSounds((prev) => ({ ...prev, [type]: !prev[type] }));
    }
  };



  const handlePlay = () => {
    if (audioUrl) {
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=2c8ceff3&format=json&limit=1&search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const track = data.results[0];

        const previewUrl = track.audiodownload_allowed ? track.audiodownload : track.audio;
        console.log('Трек із Jamendo:', track);
        console.log('URL для програвання:', previewUrl);

        setAudioUrl(previewUrl);
        setIsPlaying(true);
      } else {
        alert('Нічого не знайдено 😔');
      }
    } catch (error) {
      console.error('Помилка при пошуку:', error);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      setOffset({
        x: x * -120,
        y: y * -120,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getSeasonBackground = (season) => {
    switch (season) {
      case 'spring':
        return forestSpring;
      case 'autumn':
        return forestAutumn;
      case 'winter':
        return forestWinter;
      default:
        return forestSummer;
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundPosition: `calc(50% + ${offset.x}px) calc(50% + ${offset.y}px)`,
      }}
    >
      <div className="overlay" />

      <div className="button-container">
        {season === 'winter' ? (
          <>
            <SoundButton icon={snowIcon} onClick={() => toggleSound('snow')} />
            <SoundButton icon={fogIcon} onClick={() => toggleSound('fog')} />
          </>
        ) : season === 'spring' ? (
          <>
            <SoundButton icon={rainIcon} onClick={() => toggleSound('rain')} />
            <SoundButton icon={fogIcon} onClick={() => toggleSound('fog')} />
            <SoundButton icon={birdsIcon} onClick={() => toggleSound('birds')} />
            <SoundButton icon={leafIcon} onClick={() => toggleSound('leaf')} /> 
          </>
        ) : season === 'autumn' ? (
          <>
            <SoundButton icon={rainIcon} onClick={() => toggleSound('rain')} />
            <SoundButton icon={fogIcon} onClick={() => toggleSound('fog')} />
            <SoundButton icon={birdsIcon} onClick={() => toggleSound('birds')} />
                <SoundButton icon={autumnLeafIcon} onClick={() => toggleSound('autumnLeaf')} /> 
          </>
        ) : (
          <>
            <SoundButton icon={rainIcon} onClick={() => toggleSound('rain')} />
            <SoundButton icon={fogIcon} onClick={() => toggleSound('fog')} />
            <SoundButton icon={birdsIcon} onClick={() => toggleSound('birds')} />
          </>
        )}
      </div>

      <MusicMenu onPlay={handlePlay} onPause={handlePause} onSearch={handleSearch} />

      <FogEffect visible={sounds.fog} />
      {(sounds.rain || rainFading) && (
        <ReactHowler src={rainSound} playing={sounds.rain} loop volume={rainFading ? 0 : 0.5} />
      )}
      {sounds.birds && (
        <ReactHowler src={birdsSound} playing loop volume={0.5} />
      )}
      {sounds.fog && (
        <ReactHowler src={fogSound} playing loop volume={0.9} />
      )}
      {(sounds.snow || snowFading) && <SnowEffect isActive={sounds.snow} isFading={snowFading} />}
      <RainEffect isActive={sounds.rain} />
      <LeafEffect isActive={leafActive} isFading={false} />
      <AutumnLeafEffect isActive={autumnLeafActive} isFading={false} /> 


      {/* Jamendo player */}
      {audioUrl && (
        <ReactHowler
          key={audioUrl} 
          src={audioUrl}
          playing={isPlaying}
          volume={0.9}
          html5={true}
          onLoadError={(id, error) => console.error(' Помилка завантаження треку:', error)}
        />
      )}

      <SeasonMenu onSelectSeason={setSeason} />
      <SeasonBackground currentSeason={season} offset={offset} />
    </div>
  );
};

export default App;

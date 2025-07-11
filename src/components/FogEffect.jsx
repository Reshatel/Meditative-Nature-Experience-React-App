import React, { useEffect, useRef, useState } from 'react';
import './FogEffect.css';
import fogTexture from '../assets/fog-texture.png';

const FogEffect = ({ visible }) => {
  const layer1 = useRef();
  const layer2 = useRef();
  const layer3 = useRef();

  const [isHidden, setIsHidden] = useState(!visible);
  const hasMounted = useRef(false);

  useEffect(() => {
    const layers = [layer1.current, layer2.current, layer3.current];

  
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!visible) {
        setIsHidden(true);
      }
      return;
    }

    if (visible) {
      setIsHidden(false);
      layers.forEach((layer) => {
        if (!layer) return;
        layer.classList.remove('fade-out');
        void layer.offsetWidth;
        layer.classList.add('fade-in');
      });
    } else {
      layers.forEach((layer) => {
        if (!layer) return;
        layer.classList.remove('fade-in');
        void layer.offsetWidth;
        layer.classList.add('fade-out');
      });

      setTimeout(() => {
        setIsHidden(true);
      }, 2000); 
    }
  }, [visible]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      const intensity = 1 - Math.abs(y);

      const transforms = [
        { ref: layer1, offsetX: 20, offsetY: 10, baseOpacity: 0.1, opacityFactor: 0.1 },
        { ref: layer2, offsetX: 40, offsetY: 20, baseOpacity: 0.1, opacityFactor: 0.1 },
        { ref: layer3, offsetX: 60, offsetY: 30, baseOpacity: 0.1 , opacityFactor: 0.1 },
      ];

      transforms.forEach(({ ref, offsetX, offsetY, baseOpacity, opacityFactor }) => {
        if (ref.current) {
          ref.current.style.transform = `translate(${x * offsetX}px, ${y * offsetY}px)`;
          ref.current.style.opacity = `${baseOpacity + intensity * opacityFactor}`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isHidden) return null;

  return (
    <div className="fog-container">
      <div className="fog-layer fade-in" ref={layer1} style={{ backgroundImage: `url(${fogTexture})` }} />
      <div className="fog-layer fade-in" ref={layer2} style={{ backgroundImage: `url(${fogTexture})` }} />
      <div className="fog-layer fade-in" ref={layer3} style={{ backgroundImage: `url(${fogTexture})` }} />
    </div>
  );
};

export default FogEffect;

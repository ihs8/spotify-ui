import { useState } from 'react';

import { RangeSlider } from '..';
import './PlaybackProgress.styles.css';

export const PlaybackProgress = () => {



  const [audioValue, setAudioValue] = useState(0);



  const handleProgressValue = (value) => {
    setAudioValue(Number(value));
  };






  return (
    <div className="player__section--2">
      <div className="time-section--1">{"0:0"}</div>
      <RangeSlider
        inputMin={0}
        
        handle={handleProgressValue}
        progress={0}
        inputValue={audioValue}


      />
      <div className="time-section--2">{"0:0"}</div>
    </div>
  );
};

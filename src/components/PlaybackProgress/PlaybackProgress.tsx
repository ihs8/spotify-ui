import { useState } from 'react';

import { RangeSlider } from '..';
import './PlaybackProgress.styles.css';

export const PlaybackProgress = (props) => {


  const [audioMaxLength, setAudioMaxLength] = useState("0:0");
  const [audioPlayedLength, setAudioPlayedLength] = useState("0:0"
  );
  const [audioValue, setAudioValue] = useState(0);
  const [progress, setProgress] = useState(0);


  const handleProgressValue = (value) => {
    setAudioValue(Number(value));
  };






  return (
    <div className="player__section--2">
      <div className="time-section--1">{audioPlayedLength}</div>
      <RangeSlider
        inputMin={0}
        
        handle={handleProgressValue}
        progress={progress}
        inputValue={audioValue}


      />
      <div className="time-section--2">{audioMaxLength}</div>
    </div>
  );
};

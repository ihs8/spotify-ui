import './Controls.styles.css';

import { Button } from '../';
import {
  RandomImg,
  BackTrackImg,
  PlayImg,
  NextTrackImg,
  LoopTrackImg,
} from '../../assets/svg';

export const Controls = () => {
  return (
    <div
      className={`player__section--1 player__controls__disabled`}
    >
      <Button
        type="player"
        src={<RandomImg />}
        

      />
      <Button
        type="player"
        src={<BackTrackImg />}
        onClick={() => {
        }}
      />
      <Button
        type="player"
        custom="Play--buton"
        src={ <PlayImg /> }
        onClick={() => {
          
        }}
      />
      <Button
        type="player"
        src={<NextTrackImg />}
        onClick={() => {
          
        }}
      />
      <Button
        type="player"
        src={<LoopTrackImg />}
       
    
      />
    </div>
  );
};

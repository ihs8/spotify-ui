import './Player.styles.css';
import {
  Button, Controls, DeviceButton,
} from '..';

import { QueueImg } from '../../assets/svg/index';
import { PlaybackProgress } from '../PlaybackProgress/PlaybackProgress';
import { VolumeButton } from '../VolumeButton/VolumeButton';
export const Player = () => {








  return (
    <div className="player">

      <div
        className={`player__display false player__display--close'}`}
      >

      </div>
      <div
        className={` player__controls player__controls__disabled`}
      >
        <Controls />
        <PlaybackProgress />
      </div>
      <div className="player__options">
        <Button type="player" src={<QueueImg />} />
        <DeviceButton />
        <VolumeButton />
      </div>
    </div>
  );
};

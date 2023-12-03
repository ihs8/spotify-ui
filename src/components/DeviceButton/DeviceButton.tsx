import { useState } from 'react';
import { Button } from '../Button/Button';
import { PcImg} from '../../assets/svg';
import './DeviceButton.styles.css';
import { useComponentVisible } from '../../utils';


export const DeviceButton = () => {
  const { ref1,  isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [showDevices, setShowDevices] = useState(false);
  return (
    <div className="devices__wrapper" ref={ref1}>
      <Button
        type="player"
        custom="devices__button"
        src={<PcImg />}
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
        }}
      />
      <div
        className={`devices__list ${
          isComponentVisible && 'devices__list--visible'
        }`}
      >
        <div className="devices__header">
          <h3>
          Connect to
            <br /> device
          </h3>
        </div>
        <div className="devices__img">
          <img
            src="https://open.scdn.co/cdn/images/connect_header@1x.8f827808.png"
            alt=""
          />
        </div>
        <div
          className={`${showDevices ? 'devices__main--list' : 'devices__main'}`}
        >
          {!showDevices &&
            <>
              <p>Play and control Spotify on any device.</p>
              <p>
              Open Spotify on another device and, magically, it will appear here.

              </p>
              <a className="devices__main__button" href="#">
              KNOW MORE
              </a>
            </>
          }
        </div>
      </div>
    </div>
  );
};

import {  useRef, useState } from 'react';
import './Card.styles.css';
import { Button } from '..';
import { PlayImg, Pause } from '../../assets/svg';

import { useNavigate } from 'react-router-dom';

export const CardLiked = (props) => {


  const { itemInfo } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const cardRef = useRef<any>(null);

  const handlePlay = async () => {
  };



  const navigate = useNavigate();

  const navigateTo = (url, target) => {
    if (
      (cardRef.current &&
        target.target.className == cardRef.current.className) ||
      target.target.offsetParent.className == 'card__img'
    ) {
      navigate(url);
    }
  };

  return (
    <div
      onClick={(e) => {
        navigateTo('/spotify-ui/collection/tracks', e);
      }}
      className="card__type--song card__type--liked"
      ref={cardRef}
    >
      <Button
        onClick={() => {
          handlePlay();
        }}
        type="player"
        custom={`play--buton--card ${
          isPlaying && 'play--buton--card--playing'
        }`}
        src={isPlaying ? <Pause /> : <PlayImg />}
      />

      <div className="card__info">
        <span className="card__title">{itemInfo.name}</span>
        <span className="card__autor">
          {itemInfo.tracks.length + ' liked songs'}
        </span>
      </div>
    </div>
  );
};

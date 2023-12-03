import  {   useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '..';
import { PlayImg, Pause, SongImg } from '../../assets/svg';


import './Card.styles.css';

export const Card = (props) => {
  
  const { data } = props;
  const [isPlaying, _] = useState(false);
  const { id, uri, name, type } = data;
  const cardRef = useRef<any>(null);
  
  const convertUri = (uri) => uri?.substr(7, uri.length).replaceAll(':', '/');

  const handlePlay = async () => {
    console.log(uri);
    
  };



  const navigate = useNavigate();

  const navigateTo = (id, target) => {
    if (
      (cardRef.current && target.className == cardRef.current.className) ||
      target?.offsetParent?.className == 'card__img' ||
      target?.offsetParent?.className == 'card__img__wrapper'
    ) {
      navigate(`/spotify-ui/${type == 'track' ? 'album' : type}/${id}`);
    }
  };


  return (
    <div
      ref={cardRef}
      className={`card__type--song ${type == 'artist' && 'card__type--artist'}`}
      onClick={(event) => {
        navigateTo(type == '`/spotify-ui/track' ? data.album.id : id, event.target);
      }}
    >
      <div className="card__img">
        <div className="card__img__wrapper">
          {type == 'playlist' && data?.images == undefined ? (
            <div className="undefined__cover--card">
              <div className="undefined__icon">
                <SongImg />
              </div>
            </div>
          ) : (
            <img
              src={
                type == 'track' ? data?.album?.images[0]?.url : data.images[0]?.url
              }
              alt=""
            />
          )}
        </div>

        {!(type == 'artist') && (
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
        )}
      </div>
      <div className="card__info">
        <span className="card__title">
          <Link
            to={"/spotify-ui/" + data?.album ? convertUri(data?.album?.uri) : convertUri(data?.uri)}
          >
            {name}
          </Link>
        </span>
        <span className="card__descripton">
          {data.description && data.description}
          {type == 'artist' && 'Artist'}
          {data.artists &&
            data.artists.map((e, index) => (
              <>
                {e.name}
                {index < data.artists.length - 1 && ', '}
              </>
            ))}
        </span>
      </div>
    </div>
  );
};

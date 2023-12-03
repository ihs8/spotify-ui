import  {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { NoArtistImg } from '../../assets/svg';
import { CardFullSection, PageHeader, Loading } from '../../components';

import { useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';
import { spotifyApi } from '../home/Home';

export const CollectionArtists = () => {
  const [loading, setLoading] = useState(true);
  const [userArtists, setUserArtists] = useState<any>();
  const  accessToken  =  localStorage.getItem('access_token');
  useEffect(() => {
    if (accessToken) {
  
      spotifyApi.getFollowedArtists()
        .then((data) => {
          const artists = data.artists.items;
          setUserArtists(artists.map((item) => useResponseFormater(item)));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user followed artists:', error);
        });
    }
  }, [accessToken]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageHeader bgColor="rgb(18, 18, 18)" disabled={true} />

          <div className="collection">
            {userArtists.length > 0 ? (
              <CardFullSection title="Artists" data={userArtists} />
            ) : (
              <div className="no_info">
                <div className="no_info__img">
                  <NoArtistImg />
                </div>
                <div className="no_info__description">
                  <h2>Follow your artist</h2>
                  <span>
                  To follow artists you like, just click the button
                    “Follow”.
                  </span>
                </div>
                <div className="no_info__button">
                  <Link to={'/spotify-ui/search'}>SEARCH ARTISTS</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

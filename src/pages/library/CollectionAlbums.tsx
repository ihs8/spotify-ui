import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { NoAlbumImg } from '../../assets/svg';
import { CardFullSection, PageHeader, Loading } from '../../components';

import { useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';
import { spotifyApi } from '../home/Home';

export const CollectionAlbums = () => {
  const  accessToken  =  localStorage.getItem('access_token');
    const [loading, setLoading] = useState(true);
  const [userAlbums, setUserAlbums] = useState<any>({});

  useEffect(() => {
    if (accessToken) {

      spotifyApi.getMySavedAlbums()
        .then((data) => {
          const albums = data.items.map((e) => e.album);
          setUserAlbums(albums.map((item) => useResponseFormater(item)));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user albums:', error);

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
            {userAlbums.length ? (
              <CardFullSection title="Albums" type="albums" data={userAlbums} />
            ) : (
              <div className="no_info">
                <div className="no_info__img">
                  <NoAlbumImg />
                </div>
                <div className="no_info__description">
                  <h2>Follow your first album</h2>
                  <span>To save an album, click the heart icon.</span>
                </div>
                <div className="no_info__button">
                  <Link to={'/spotify-ui/search'}>SEARCH ALBUMS</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import { Loading, PageBanner, TrackList } from '../components';

import { generateRandomColor } from '../utils';


import './styles/Template.styles.css';
import { spotifyApi } from '../pages/home/Home';

export const ArtistTemplate = () => {
  const  accessToken  =  localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>('');

  const { id } = useParams();

  useEffect(() => {
    setData('');
    setLoading(true);

    if (accessToken) {
   

      Promise.all([
        spotifyApi.getArtist(id as string),
        spotifyApi.containsMySavedAlbums([id as string]),
        spotifyApi.getArtistTopTracks(id as string, 'BR'),
      ])
        .then(([artist, isLiked, tracksData]:any) => {
          console.log(tracksData);
          
          const { tracks } = tracksData;
          const { name, id, images, type, followers, description, uri } = artist;
          setData({
            uri: uri,
            name: name,
            id: id,
            type: type,
            tracks: tracks,
            isLiked: isLiked[0],
            color: generateRandomColor(),
            description: description,
            cover: images,
            followers: followers,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id, accessToken]);

  const handlePlay = async () => {
  };



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageBanner play={[handlePlay, false]} data={data} colection={undefined} />
          <div className="page__template">
            <div className="main__template__container">
              <TrackList var1="ALBUM" data={data} var2={undefined} collection={undefined} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

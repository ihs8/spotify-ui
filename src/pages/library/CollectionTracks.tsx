import { useContext, useEffect, useState } from 'react';


import { Loading, PageBanner, TrackList } from '../../components';

import {
  TrackContext,
  UserContext,
} from '../../utils/context';
import {  useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';
import { spotifyApi } from '../home/Home';

export const CollectionTracks = () => {
  const  accessToken  =  localStorage.getItem('access_token');
  const { currentUser } = useContext(UserContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>('');

  useEffect(() => {
    if (!accessToken) return;
  
    const fetchData = async () => {
      setLoading(true);
  
      try {
  
        const tracksResponse = await spotifyApi.getMySavedTracks();
        const userLiked = {
          name: 'Liked Songs',
          type: 'playlist',
          tracks: tracksResponse.items.map(item => useResponseFormater(item.track)), // Assuming formatResponse is a regular function
          owner: currentUser.display_name,
          color: 'rgb(80, 56, 160)',
          cover: [
            {
              url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
            },
          ],
        };
        setData(userLiked);
      } catch (error) {
        console.error('Error fetching data from Spotify:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [accessToken]);

  const handlePlay = async () => {
    
  };



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageBanner play={[handlePlay, isPlaying]} colection data={data} />
          <div className="playlist__template">
            <div className="main__template__container">
              <TrackList var1="ALBUM" data={data} collection var2={undefined} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

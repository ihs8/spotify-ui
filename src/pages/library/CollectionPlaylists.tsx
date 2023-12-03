import {  useEffect, useState } from 'react';

import {
  CardFullSection,
  PageHeader,
  Loading,
  CardLiked,
} from '../../components';

import { useResponseFormater } from '../../utils';

import './styles/Collection.styles.css';
import { spotifyApi } from '../home/Home';

export const CollectionPlaylists = () => {
  const  accessToken  =  localStorage.getItem('access_token');

  const [loading, setLoading] = useState(true);
  const [userPlaylists, setUserPlaylists] = useState<any>({});
  const [userLiked, setUserLiked] = useState<any>('');
  useEffect(() => {
    if (!accessToken) return;
  
    const fetchData = async () => {
      setLoading(true);
  
      try {
       
  
        const playlistsResponse:any = await spotifyApi.getUserPlaylists();
        
        
        const userPlaylists = playlistsResponse.items.map(item => useResponseFormater(item)); // Assuming formatResponse is a regular function
       
        setUserPlaylists(userPlaylists);
  
        const tracksResponse:any = await spotifyApi.getMySavedTracks();
        const userLiked = {
          name: 'Liked Songs',
          type: 'playlist',
          tracks: tracksResponse.items.map(e => e.track),
        };
        
        setUserLiked(userLiked);
      } catch (error) {
        console.error('Error fetching data from Spotify:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [accessToken, setLoading, setUserPlaylists, setUserLiked]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageHeader bgColor="rgb(18, 18, 18)" disabled={true} />

          <div className="collection">
            <CardFullSection
              title="Playlists"
              data={userPlaylists.map((e) => {
                return { ...e, description: `De ${e.owner.display_name}` };
              })}
            >
              <CardLiked itemInfo={userLiked} />
            </CardFullSection>
          </div>
        </div>
      )}
    </>
  );
};



import React, { useState, useEffect, useContext, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { CardRowSection, Loading, PageHeader } from '../../components/index';
import { useResponseFormater } from '../../utils';
import './Home.styles.css';
export const spotifyApi = new SpotifyWebApi();
const Home = () => {
  const homeRef = useRef(null);
  const  accessToken  = localStorage.getItem('access_token');

  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState({
    recent_played: [],
    top_user_tracks: [],
    top_user_artists: [],
    new_releases: [],
    top_list_category: [],
    mood_category: []
  });

  const {
    recent_played,
    top_user_tracks,
    top_user_artists,
    new_releases,
    top_list_category,
    mood_category,
  } = homeData;


  

  
  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) console.log(accessToken,"accessToken"); ;
  
  
     try {
        spotifyApi.setAccessToken(accessToken);
 
  
        // Fetch data from Spotify
        const [recentlyPlayed, topTracks, topArtists, newReleases] = await Promise.all([
          (await spotifyApi.getMyRecentlyPlayedTracks({limit:4})),
         await spotifyApi.getMyTopTracks({limit:4}),
         await spotifyApi.getMyTopArtists({limit:4}),
         await spotifyApi.getNewReleases({ country: 'TN', limit:5 }),
        ]);
       
        
  
        const formattedRecentlyPlayed:any = recentlyPlayed.items.map((item:any) => useResponseFormater(item.track));
        const formattedTopTracks :any = topTracks.items.map(useResponseFormater);
        const formattedTopArtists:any = topArtists.items.map(useResponseFormater);
        const formattedNewReleases:any = newReleases.albums.items.map(useResponseFormater);
        
        const [  topListCategory, moodCategory] = await Promise.all([
          
      

        await  spotifyApi.getCategoryPlaylists('toplists', { country: 'TN' }),
        await  spotifyApi.getCategoryPlaylists("mood",{country : 'TN'})
        ]);
    
        const formattedTopListCategory:any = topListCategory.playlists.items.map((item:any) => useResponseFormater(item));
        const formattedMoodCategory:any = moodCategory.playlists.items.map((item:any) => useResponseFormater(item));

           setHomeData({
          recent_played: formattedRecentlyPlayed,
          top_user_tracks: formattedTopTracks,
          top_user_artists: formattedTopArtists,
          new_releases: formattedNewReleases,
          top_list_category: formattedTopListCategory,
          mood_category: formattedMoodCategory,
        });
        setLoading(false);
        
        
      } catch (error) {
        console.error(error);
      }
    };
  
    accessToken && fetchData();
  }, [accessToken]);
  
 

  return (
    <>
    
      {loading ? (
        <Loading />
        
      ) : (
        <>
          <div className="page__wrapper">
            <PageHeader bgColor="rgb(32, 120, 160)" disabled={undefined} children={undefined} />
            <div className="home" ref={homeRef}>
              <CardRowSection
                title="Recently Played"
                data={recent_played.filter(
                  (value:any, index, self) =>
                    index ===
                    self.findIndex((t:any) => t.album.id === value.album.id),
                )}
              />
            
        
              <CardRowSection
                title="The most listened to by you"
                data={top_user_tracks}
              />
              <CardRowSection
                title="Artists most listened to by you"
                data={top_user_artists}
              />
             
              <CardRowSection title="Your mood" data={mood_category} />
              <CardRowSection
                title="Tops of the moment"
                data={top_list_category}
              />
              <CardRowSection title="New Releases" data={new_releases} />
            </div>
          </div>
          
        
        </>
      )}
      
    </>
  );
};
export default Home;

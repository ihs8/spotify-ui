import{ useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { TrackList } from '../TrackList/TrackList';
import './AddSongs.styles.css';
import { spotifyApi } from '../../pages/home/Home';


export const AddSongs = ({ id, data }) => {
  const  accessToken  =  localStorage.getItem('access_token');

  const [inputValue, setInputValue] = useState('');
  const [trackList, setTrackList] = useState<any>({ type: 'search', tracks: [] });

  const handleSearch = (value) => {
    setInputValue(value);
  };
  useEffect(() => {
    if (!accessToken || !inputValue) {
      setTrackList({ type: 'search', tracks: [] });
      return;
    }
  
    const searchTracks = async () => {
      try {
      
  
        const searchResponse = await spotifyApi.searchTracks(inputValue);
        const tracks = searchResponse.tracks.items.filter(track => {
          return !data.tracks.find(e => track.id === e.id);
        });
  
        setTrackList({
          id: id, 
          type: 'search--playlist',
          tracks: tracks,
        });
      } catch (error) {
        console.error('Error searching tracks:', error);
      }
    };
  
    searchTracks();
  }, [accessToken, inputValue, setTrackList, data.tracks, id]);
  return (
    <div className="add__song ">
      <div className="add__song__header">
        <h2>Let's spice up your playlist</h2>
      </div>
      <div className="add__song__main">
        <SearchBar
          onChange={handleSearch}
          custom="add__song__input"
          theme="black"
        />
        {trackList.tracks && <TrackList data={trackList} var1={undefined} var2={undefined} collection={undefined} />}
      </div>
    </div>
  );
};

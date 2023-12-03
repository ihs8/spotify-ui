import  { useContext, useEffect } from 'react';
import './SideMenu.styles.css';
import { Button } from '../index';
import {
  isCoverOpen,
  PlaylistContext,
  UserContext,
} from '../../utils/context';
import {
  LogoImg,
  HomeImg,
  SearchImg,
  LibraryImg,
  PlusImg,
  LikeImg,
  ArrowUpImg,
} from '../../assets/svg/index';
import { spotifyApi } from '../../pages/home/Home';

export const SideMenu = () => {
  const { coverOpen, setCoverOpen } = useContext(isCoverOpen);
  const { currentUser } = useContext(UserContext);
  const { userPlaylists, setUserPlaylists } = useContext(PlaylistContext);
  const  accessToken  =  localStorage.getItem('access_token');



  useEffect(() => {
    if (!accessToken) return;
  
    const fetchData = async () => {
      try {
  
        const playlistsResponse = await spotifyApi.getUserPlaylists();
        setUserPlaylists(playlistsResponse.items);
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    };
  
    fetchData();
  }, [accessToken, setUserPlaylists]);

  const handleAddPlaylist = () => {
    
  spotifyApi.createPlaylist(currentUser.id,)
    spotifyApi.createPlaylist(currentUser.id,{name:`Vaerdia Playlist nº ${userPlaylists.length + 1}`,public:true})
      .then(response => {
        setUserPlaylists([response, ...userPlaylists]);
      })
      .catch(error => console.error('Error creating playlist:', error));
  };

  return (
    <div className="side__nav">
      <div className="logo__container">
        <LogoImg />
      </div>

      <div className="menu__wrapper">
        <Button to="/spotify-ui/" src={<HomeImg />} type="nav">
          Home
        </Button>
        <Button to="/spotify-ui/search" src={<SearchImg />} type="nav">
          Search
        </Button>
        <Button to="/spotify-ui/collection" src={<LibraryImg />} type="nav">
          See Your Library
        </Button>
      </div>
      <div className="menu__wrapper divider--top ">
        <Button
          onClick={() => {
            handleAddPlaylist();
          }}
          custom={'create__playlist'}
          src={<PlusImg />}
          type="nav"
        >
          Create playlist
        </Button>
        <Button
          to="/spotify-ui/collection/tracks"
          custom={'liked__songs'}
          src={<LikeImg />}
          type="nav"
        >
          Liked Songs
        </Button>
      </div>
      <div className="divider--bottom--line"></div>
      <div className="userPlaylist__nav">
        {userPlaylists &&
          userPlaylists.map((e, index) => {
            return (
              <Button to={`/spotify-ui/playlist/${e.id}`} key={index} type="nav">
                {e.name}
              </Button>
            );
          })}
      </div>
      <div className="cover__side">
        <div
          className={`cover__side--wrapper ${
            coverOpen && 'cover__side--wrapper--open'
          }`}
        >
          {/* {currentTrack && (
            <img src={currentTrack.album.images[0].url} alt="" />
          )} */}
          <Button
            onClick={() => setCoverOpen((coverOpen) => !coverOpen)}
            type="icon"
            custom="expand__cover--side"
            src={<ArrowUpImg />}
          />
        </div>
      </div>
    </div>
  );
};


import './App.css'

import { uri } from './credentials';

import Home from './pages/home/Home';
import { SearchPage } from './pages/search/SearchPage';
import {
  PlaylistTemplate,
  AlbumTemplate,
  ArtistTemplate,
  GenreTemplate,
} from './templates/index';
import {
  CollectionTracks,
  CollectionPlaylists,
  CollectionAlbums,
  CollectionArtists,
} from './pages/library';

import { Layout, Loading } from './components';
import { getCookie, setCookie } from './utils/useCookie';
import {  Navigate, Route, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query'
import { useEffect, useState } from 'react';
import { fetchSpotifyToken } from './spotifyService';
import { useLogin } from './auth';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const tokenMutation = useMutation(fetchSpotifyToken, {
    onSuccess:  (data) => {
      setAccessToken(data.access_token);
      localStorage.setItem('access_token',data.access_token)
      setCookie('access_token', data.access_token, data.expires_in);
      
      if (data.refresh_token) {
        setCookie('refresh_token', data.refresh_token,undefined);
      }
      
    },
    onError: (error) => {
      console.error(error);
    },
  });
  useEffect(() => {
    if (!getCookie('refresh_token')) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        navigate('/spotify-ui/login');
      } else {
       
        tokenMutation.mutate({
          grant_type: 'authorization_code',
          code,
          redirect_uri: uri,
        });
        
      }
    } else {
  
     
      
      if (location.pathname === 'https://ihs8.github.io/spotify-ui/spotify-ui') navigate("/spotify-ui/")
      tokenMutation.mutate({
        grant_type: 'refresh_token',
        refresh_token: getCookie('refresh_token'),
      });
    }
  }, [getCookie('refresh_token')]);
  

  return(
<>
  {!accessToken && getCookie('refresh_token')  ? (
  <div className="loading__overlay">
    <Loading />
  </div>
) : (
 
  

    <Layout login={useLogin}>
      <Route  path="/" element={<Home />} />
      <Route path="/playlist/:id" element={<PlaylistTemplate />} />
      <Route path="/album/:id" element={<AlbumTemplate />} />
      <Route path="/artist/:id" element={<ArtistTemplate />} />
      <Route path="/genre/:id" element={<GenreTemplate />} />
      <Route path="/collection/tracks" element={<CollectionTracks />} />
      <Route
        path="/collection/playlists"
        element={<CollectionPlaylists />}
      />
      <Route
        path="/collection/"
        element={<Navigate to="/spotify-ui/collection/playlists" replace />}
      />
      <Route path="/collection/albums" element={<CollectionAlbums />} />
      <Route path="/collection/artists" element={<CollectionArtists />} />
      <Route path="/search/" element={<SearchPage />} />
    </Layout>
   
   
  
    )}</>)
  }
;

export default App

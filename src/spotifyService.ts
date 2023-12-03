import { client_id, client_secret } from './credentials';


export const fetchSpotifyToken = async (params:any) => {
  console.log(params);
  
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
      },
      body: new URLSearchParams(params),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
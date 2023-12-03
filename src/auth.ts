import qs from 'qs'; 
import { client_id, uri, scopes } from './credentials';

export const useLogin = () => {
 

  return () => {
    window.location.href =
      'https://accounts.spotify.com/authorize?' +
      qs.stringify({
        client_id: client_id,
        response_type: 'code',
        redirect_uri: uri,
        scope: scopes.join(','),
        show_dialog: true,
      });
  };
};
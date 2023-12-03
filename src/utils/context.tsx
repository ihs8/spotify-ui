import { createContext } from 'react';
interface TokenContextType {
  accessToken: string; // Define the type of accessToken property
}
export const UserContext = createContext<any>({});

export const LoginContext = createContext<any>(false);

export const DeviceContext = createContext<any>(null);

export const StatusContext = createContext(() => {});

export const TokenContext = createContext<TokenContextType>({
  accessToken: ''
});


export const PlaylistContext = createContext<any>([]);

export const MessageContext = createContext<any>(() => {});

export const TrackContext = createContext<any>({
  currentTrack: {},
  setCurrentTrack: () => {},
});

export const PlayerContext = createContext<any>({});

export const PlaybackContext = createContext<any>({});

export const PlayContext = createContext<any>(() => {});

export const AlbumContext = createContext<any>({});

export const isCoverOpen = createContext<any>(false);

export const Menssage = createContext<any>({});

import React, { useState, createContext, useRef, useEffect, lazy } from 'react';
import './Layout.styles.css';
import { Header, SideMenu, Player, FlashMenssage } from '../index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  isCoverOpen,
  TrackContext,
  AlbumContext,
  PlayerContext,
  DeviceContext,
  UserContext,
  PlaylistContext,
  Menssage,
} from '../../utils/context';

export const Layout = (props: { children: any; login: any; }) => {
  const { children, login } = props;
  const [coverOpen, setCoverOpen] = useState(false);
  const [albumInfo, setAlbumInfo] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [userPlaylists, setUserPlaylists] = useState('');
  const [menssage, setMenssage] = useState('');

  return (
    <Menssage.Provider value={{ menssage, setMenssage }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
  
            <AlbumContext.Provider value={{ albumInfo, setAlbumInfo }}>
              <PlaylistContext.Provider
                value={{ userPlaylists, setUserPlaylists }}
              >
        
                  <isCoverOpen.Provider value={{ coverOpen, setCoverOpen }}>
                    <main className="layout">
                      <div className="main__section">
                        <SideMenu />
                        <div className="main__wrapper">
                          <Header login={login} />
                          <main className="display">
                            <Routes>{children}</Routes>
                            <FlashMenssage />
                          </main>
                        </div>
                      </div>
                      <Player />
                    </main>
                  </isCoverOpen.Provider>
              </PlaylistContext.Provider>
            </AlbumContext.Provider>
        </UserContext.Provider>
    </Menssage.Provider>
  );
};

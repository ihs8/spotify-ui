import { useContext, useEffect, useState } from 'react';
import { useComponentVisible } from '../../utils/useOutsideClick';
import './UserMenu.styles.css';
import {
  ArrowDownMenuImg,
  ArrowUpMenuImg,
  UseDefaultImg,
} from '../../assets/svg/index';
import {  UserContext } from '../../utils/context';
import { setCookie } from '../../utils/useCookie';
import { spotifyApi } from '../../pages/home/Home';

export const UserMenu = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { ref1, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
    const  accessToken  =  localStorage.getItem('access_token');
  useEffect(() => {
    const fetchData = async () => {
     
      spotifyApi.setAccessToken(accessToken)
     
      

      try {
        // Fetch the user's data
        const response = await spotifyApi.getMe();
        setCurrentUser(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data from Spotify API:', error);
        setIsLoading(false);
      }
    };

    accessToken &&  fetchData();
  }, [accessToken]);

  const handleLeave = () => {
    setCookie('refresh_token', '', 0);
    window.location.reload();
    localStorage.removeItem('access_token')
  };

  return (
    <>
      {!isLoading && (
        <div ref={ref1} className="user__menu">
          <button
            className="user__menu__btn"
            onClick={() => {
              setIsComponentVisible(!isComponentVisible);
            }}
          >
            <div className="user__picture">
              {currentUser?.images?.length ? (
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="eager"
                  src={currentUser.images[0]}
                  alt={currentUser.display_name}
                />
              ) : (
                <div className="user--default">
                  <UseDefaultImg />
                </div>
              )}
            </div>
            <div className="user__name">
              <span>{currentUser.display_name}</span>
            </div>
            <div className="user__icon">
              {isComponentVisible ? <ArrowUpMenuImg /> : <ArrowDownMenuImg />}
            </div>
          </button>
          <div
            className={`user__menu__options ${
              isComponentVisible ? 'user--open' : ''
            }`}
          >
            <ul className="menu__list">
              <li>
                <a href="#">
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Premium</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Support</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Download</span>
                </a>
              </li>
              <li>
                <button onClick={() => handleLeave()}>
                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

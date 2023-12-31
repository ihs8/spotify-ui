import './Header.styles.css';
import { Button, UserMenu } from '../index';
import {
  ArrowLeftImg,
  ArrowRigthImg,
  LogoSmallImg,
} from '../../assets/svg/index';
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavLink,
} from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';

export const Header = ({ login }) => {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateTo = (index) => {
    if (location.pathname == '/spotify-ui/' && index == -1) return;
    navigate(index);
  };
  const handleSearch = (q) => {
    setSearchParams(q && { q });
  };
  return (
    <header>
      <div className="header__wrapper">
        <Button
          type="icon"
          src={<ArrowLeftImg />}
          onClick={() => {
            navigateTo(-1);
          }}
        />
        <Button
          type="icon"
          src={<ArrowRigthImg />}
          onClick={() => {
            navigateTo(+1);
          }}
        />
        {location.pathname == '/spotify-ui/search' && (
          <SearchBar onChange={handleSearch} custom={undefined} theme={undefined} />
        )}

        {(location.pathname == '/spotify-ui/collection/albums' ||
          location.pathname == '/spotify-ui/collection/playlists' ||
          location.pathname == '/spotify-ui/collection/artists') && (
          <div className="collection__nav">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/spotify-ui/collection/playlists"
            >
              <span>Playlists</span>{' '}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/spotify-ui/collection/artists"
            >
              <span>Artists</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'collection__nav--active' : ''
              }
              to="/spotify-ui/collection/albums"
            >
              <span>Albums</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="header__wrapper">
        {location.pathname == '/spotify-ui/login' ? (
          <button className="login__button" onClick={ login()
          
          }>
            <div className="button__icon">
              <LogoSmallImg />
            </div>
            Login on Spotify
          </button>
        ) : (
          <UserMenu />
        )}
      </div>
    </header>
  );
};

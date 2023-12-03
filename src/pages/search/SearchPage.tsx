import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import {
  CardFullSection,
  TrackList,
  PageHeader,
  Loading,
  CardRowSection,
} from '../../components';
import { TokenContext } from '../../utils/context';
import { generateRandomColor, useResponseFormater } from '../../utils';
import './SearchPage.styles.css';
import { spotifyApi } from '../home/Home';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<any>('');
  const  accessToken  =  localStorage.getItem('access_token');
  const searchQuery = searchParams.get('q');
  useEffect(() => {
    if (accessToken && searchParams.get('q')) {
      // Set the access token for the Spotify API

      // Use the Spotify API SDK to make a search request
      
      spotifyApi.search(searchQuery as string, ['album', 'artist', 'playlist', 'track'])
        .then((data:any) => {
          setSearchData({
            tracks: data.tracks.items.map((item) => useResponseFormater(item)),
            albums: data.albums.items.map((item) => useResponseFormater(item)),
            artists: data.artists.items.map((item) => useResponseFormater(item)),
            playlists: data.playlists.items.map((item) => useResponseFormater(item)),
          });
        })
        .catch((error) => {
          console.error('Error searching:', error);
          // Handle the error here (e.g., show an error message to the user)
        });
    } else {
      setSearchData({
        tracks: [],
        albums: [],
        artists: [],
        playlists: [],
      });
    }
  }, [accessToken, searchParams]);
  
  useEffect(() => {
    if (accessToken) {
      spotifyApi.getCategories({country:"TN",limit:50}).then((e:any)=>{
        console.log(e,"E Res");
        
      setCategoriesData(e.categories);
      setLoading(false);
    })
   
    }
  }, [accessToken]);
console.log(searchData.length,"searchData");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageHeader bgColor="rgb(18, 18, 18)" disabled={true} />
          <div className="collection__playlists">
            {searchQuery ? (
              <>
                <div className="search__first__section">
                  <h2>Songs</h2>
                  <TrackList
                      data={{
                        type: 'search',
                        tracks: searchData.tracks,
                      }} var1={undefined} var2={undefined} collection={undefined}                  />
                </div>
                <CardRowSection
                  title="Artists"
                  data={searchData.artists.filter((e) => e.images != undefined)}
                />
                <CardRowSection title="Albums" data={searchData.albums} />
                <CardRowSection title="Playlists" data={searchData.playlists} />
              </>
            ) : (
              <CardFullSection title="Browse all">
                {categoriesData?.items.map((e, index) => (
                  <Link
                    style={{ backgroundColor: generateRandomColor() }}
                    className="card__type--category"
                    key={index}
                    to={'/spotify-ui/genre/' + e.id}
                  >
                    <img className="card__img" src={e.icons[0].url} alt="" />

                    <div className="card__title">
                      <span>{e.name}</span>
                    </div>
                  </Link>
                ))}
              </CardFullSection>
            )}
          </div>
        </div>
      )}
    </>
  );
};

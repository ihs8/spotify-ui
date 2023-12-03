import  {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Loading, PageBanner, TrackList } from '../components';

import { generateRandomColor } from '../utils';


import './styles/Template.styles.css';

export const AlbumTemplate = () => {
  const  accessToken  =  localStorage.getItem('access_token');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>('');

  const { id } = useParams();

  useEffect(() => {
    setData('');
    setLoading(true);
    if (accessToken)
      Promise.all([
        axios.get(`https://api.spotify.com/v1/albums/${id}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }),
        axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`, {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }),
      ])
        .then((e) => {
          const [data, isLiked] = e;
          const {
            name,
            description,
            images,
            type,
            artists,
            total_tracks,
            tracks,
            id,
            uri,
          } = data.data;
          setData({
            uri: uri,
            name: name,
            id: id,
            type: type,
            tracks: tracks.items,
            isLiked: isLiked.data[0],
            color: generateRandomColor(),
            description: description,
            cover: images,
            artists: artists,
            total_tracks: total_tracks,
          });
          setLoading(false);
        })
        .catch((error) => console.log(error));
  }, [id, accessToken]);

  const handlePlay = async () => {
   
  };



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageBanner play={[handlePlay, false]} data={data} colection={undefined} />
          <div className="page__template">
            <div className="main__template__container">
              <TrackList data={data} var1={undefined} var2={undefined} collection={undefined} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

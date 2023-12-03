import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading, PageBanner, TrackList, AddSongs } from '../components';

import { generateRandomColor } from '../utils';
import {
  UserContext,
} from '../utils/context';

import './styles/Template.styles.css';
import { spotifyApi } from '../pages/home/Home';

export const PlaylistTemplate = () => {
  
  const { currentUser } = useContext(UserContext);
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>('');

  const { id } = useParams();
  const  accessToken  =  localStorage.getItem('access_token');

  useEffect(() => {
    setData('');
    setLoading(true);
    if (accessToken && currentUser) {

        Promise.all([
          spotifyApi.getPlaylist(id as string),
          spotifyApi.areFollowingPlaylist(id as string, [currentUser.id]),
        ]).then(([playlist, isLiked]) => {
         
          
            const {
                name,
                images,
                type,
                owner,
                uri,
                tracks,
                description,
                followers,
            } = playlist;

            setData({
                uri: uri,
                name: name,
                id: id,
                type: type,
                owner: owner.display_name,
                tracks: tracks.items.map((e) => {
                    return e.track;
                }),
                description: description,
                followers: followers,
                isLiked: isLiked[0],
                editable: owner.id == currentUser.id,
                cover: images.length ? images : undefined,
                color: generateRandomColor(),
            });

            setLoading(false);
        });
    }
}, [id, accessToken, currentUser]);

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
              <TrackList var1="ÁLBUM" data={data} var2={undefined} collection={undefined} />
              {data.editable && <AddSongs data={data} id={data.id} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

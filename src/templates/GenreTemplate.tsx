import  {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CardFullSection, Loading, PageHeader } from '../components';


import { useResponseFormater } from '../utils';

import './styles/Template.styles.css';
import { spotifyApi } from '../pages/home/Home';

export const GenreTemplate = () => {
  const  accessToken  =  localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState('');
  const [pageData, setPageData] = useState<any>('');
  const { id } = useParams();

  useEffect(() => {
    setData('');
    setLoading(true);
    if (accessToken) {

        Promise.all([
          spotifyApi.getCategoryPlaylists(id as string, { limit: 50 })
                .then((e:any) => {
                 
                    setData(
                        e.playlists.items.map((item) => useResponseFormater(item))
                    );
                }),
                spotifyApi.getCategory(id as string)
                .then((e:any) => {
                  
                    setPageData(e);
                }),
        ]).then(() => {
            setLoading(false);
        });
    }
}, [id,accessToken]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="page__wrapper">
          <PageHeader bgColor="rgb(18, 18, 18)" />
          <div className="genre__header">
            <h1>{pageData?.name}</h1>
          </div>
          <div className="genre__template">
            <CardFullSection data={data} />
          </div>
        </div>
      )}
    </>
  );
};

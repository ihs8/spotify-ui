import  { useContext} from 'react';
import { OptionsImg } from '../../assets/svg';
import { DropdownMenu } from '..';
import './OptionsDropdown.styles.css';
import { Menssage } from '../../utils/context';
import { spotifyApi } from '../../pages/home/Home';


export const OptionsDropdown = ({
  data,
  openModal,
  editable,
  isLiked,
  setIsLiked,
}) => {
  const { setMenssage } = useContext(Menssage);

  const handleAddQueue = async () => {
    try {

      const response:any = await spotifyApi.queue(data.uri);

      if (response) {
        setMenssage({
          text: 'In the queue',
        });
      } else {
        setMenssage({
          text: 'Oops, something went wrong!',
          type: 'important',
        });
      }
    } catch (error) {
      console.error('Error adding to queue:', error);
      setMenssage({
        text: 'Oops, something went wrong!',
        type: 'important',
      });
    }
  };


  const handleFollow = async () => {
    if (data.type !== 'track') {
      try {
       

        let response;

        if (isLiked) {
          // Unfollow the artist/playlist/album
          if (data.type === 'artist') {
            response = await spotifyApi.unfollowArtists([data.id]);
          } else if (data.type === 'playlist') {
            response = await spotifyApi.unfollowPlaylist(data.id);
          } else if (data.type === 'album') {
            response = await spotifyApi.removeFromMySavedAlbums([data.id]);
          }
        } else {
          if (data.type === 'artist') {
            response = await spotifyApi.followArtists([data.id]);
          } else if (data.type === 'playlist') {
            response = await spotifyApi.followPlaylist(data.id);
          } else if (data.type === 'album') {
            response = await spotifyApi.addToMySavedAlbums([data.id]);
          }
        }

        if (response) {
          setIsLiked(!isLiked);
          setMenssage({
            text: !isLiked ? 'Added to your library' : 'Removed from your library',
          });
        } else {
          setMenssage({
            text: 'Oops, something went wrong!',
            type: 'important',
          });
        }
      } catch (error) {
        console.error('Error following/unfollowing:', error);
        setMenssage({
          text: 'Oops, something went wrong!',
          type: 'important',
        });
      }
    }
  };


  return (
    <DropdownMenu
      src={<OptionsImg />}
      position={data.type == 'track' ? 'left' : 'right'}
    >
      <ul className="buttons__wrapper">
        {data.type != 'track' && (
          <li>
            <button
              onClick={() => (editable ? openModal(true) : handleFollow())}
            >
              {editable ? (
                <span>Edit </span>
              ) : (
                <span>
                  {isLiked
                    ? 'Remove'
                    : 'Add'}
                </span>
              )}
            </button>
          </li>
        )}
        {data.type == 'track' && (
          <>
            <li>
              <button onClick={() => handleAddQueue()}>
                <span>Add the queue</span>
              </button>
            </li>
          </>
        )}
      </ul>
    </DropdownMenu>
  );
};

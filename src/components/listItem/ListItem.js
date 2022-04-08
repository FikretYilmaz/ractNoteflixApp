import { NoteAltOutlined, PlayArrow } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import API_KEY from '../../js/apiKey';
import Note from '../note/Note';
import './listItem.scss';

const ListItem = ({ genreName, index, movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDuration, setMovieDuration] = useState(null);
  const [showNoteComponent, setShowNoteComponent] = useState('none');
  const key = API_KEY;

  useEffect(() => {
    const getTRailerKey = async () => {
      try {
        const url = `http://api.themoviedb.org/3/movie/${movie.id}/videos?${key}`;
        const response = await fetch(url);
        const data = await response.json();
        const link = await data.results;
        const singleKey = await link[0];
        setTrailerKey(singleKey);
      } catch (err) {
        console.error(err);
      }
    };
    getTRailerKey();
  }, [movie.id, key]);

  useEffect(() => {
    const getMovieDuration = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?${key}`;
        const response = await fetch(url);
        const data = await response.json();
        const duration = await data.runtime;
        setMovieDuration(duration);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieDuration();
  }, []);

  const handleNote = async () => {
    setShowNoteComponent('noteItem');
  };

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="item"
      />

      {isHovered && (
        <React.Fragment>
          <ReactPlayer
            className="video"
            width="100%"
            height="140px"
            controls={true}
            url={
              trailerKey
                ? `https://www.youtube.com/watch?v=${trailerKey.key}`
                : `https://www.youtube.com/watch?v=1D_qK6jWNAM`
            }
          />

          <div className="itemInfo">
            <div className="icons">
              <Link to={trailerKey ? `/watch/${trailerKey.key}` : '/'}>
                <PlayArrow className="icon" />
              </Link>

              <NoteAltOutlined onClick={handleNote} className="icon" />

              <Note
                showNoteComponent={showNoteComponent}
                setShowNoteComponent={setShowNoteComponent}
                movie={movie}
              />
            </div>
            <div className="itemInfoTop">
              <span>{movieDuration} Mins</span>
              <span>{movie.release_date}</span>
            </div>
            <div className="desc">{movie.overview}</div>
            <div className="genre">{genreName}</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ListItem;

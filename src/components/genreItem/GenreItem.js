import {
  Add,
  NoteAltOutlined,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import API_KEY from '../../js/apiKey';
import './genreItem.scss';

const GenreItem = ({ genreName, movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDuration, setMovieDuration] = useState(null);
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
  }, [movie.id]);

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

  return (
    <div
      className="categoryItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="item"
      />

      {isHovered && (
        <>
          <ReactPlayer
            className="video"
            width="100%"
            height="140px"
            controls={true}
            url={
              (trailerKey === null || trailerKey === undefined
                ? 'https://www.youtube.com/watch?v=1D_qK6jWNAM'
                : `https://www.youtube.com/watch?v=${trailerKey.key}`) ||
              (trailerKey === undefined
                ? 'https://www.youtube.com/watch?v=1D_qK6jWNAM'
                : `https://www.youtube.com/watch?v=${trailerKey.key}`)
            }
          />

          <div className="itemInfo">
            <div className="icons">
              <Link to={{ pathname: 'watch', trailerKey: trailerKey }}>
                <PlayArrow className="icon" />
              </Link>
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownAltOutlined className="icon" />
              <Link to="note">
                <NoteAltOutlined className="icon"></NoteAltOutlined>
              </Link>
            </div>
            <div className="itemInfoTop">
              <span>{movieDuration} Mins</span>
              <span className="limit">+16</span>
              <span>{movie.release_date}</span>
            </div>
            <div className="desc">{movie.overview}</div>
            <div className="genre">{genreName}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default GenreItem;

import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import './featured.scss';
import API_KEY from '../../js/apiKey';
import { Link } from 'react-router-dom';
const key = API_KEY;
const url = `https://api.themoviedb.org/3`;

const Featured = ({
  type,
  genres,
  setSelectedCategory,
  setSelectedOptions,
}) => {
  const [initialMovie, setInitialMovie] = useState('');
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const getRandomInitialMovie = async () => {
      try {
        const api = `${url}/discover/movie?${key}`;
        const response = await fetch(api);
        const data = await response.json();
        const movie = await data.results;
        setInitialMovie(movie[Math.floor(Math.random() * movie.length - 1)]);
      } catch (err) {
        console.error(err);
      }
    };
    getRandomInitialMovie();
  }, []);

  useEffect(() => {
    const getTrailerKey = async () => {
      try {
        const api = `https://api.themoviedb.org/3/movie/${initialMovie.id}/videos?${key}`;
        const response = await fetch(api);
        const data = await response.json();
        const link = await data.results;
        const singleKey = await link[0];
        setTrailerKey(singleKey);
      } catch (err) {
        console.error(err);
      }
    };
    getTrailerKey();
  }, [initialMovie]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>
            {(type === 'movies' && 'Movies') ||
              (type === 'series' && 'Series') ||
              (type === 'myNotes' && 'My Notes') ||
              (type === 'search' && 'Search')}
          </span>
          {type === 'search' && <div></div>}
          {type === 'myNotes' && <div></div>}
          {type === 'movies' && (
            <select
              name="genre"
              id="genre"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedOptions(
                  e.target.options[e.target.selectedIndex].text,
                );
              }}
            >
              <option>All Genres</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
          {type === 'series' && (
            <select
              name="genre"
              id="genre"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedOptions(
                  e.target.options[e.target.selectedIndex].text,
                );
              }}
            >
              <option>All Genres</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <img
        src={`https://image.tmdb.org/t/p/original/${
          initialMovie?.backdrop_path || initialMovie?.poster_path
        }`}
        alt="stranger"
      />
      <div className="info">
        <span className="desc"></span>
        <div className="buttons">
          <Link
            className="play"
            to={trailerKey ? `/watch/${trailerKey.key}` : '/'}
          >
            <button>
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
        </div>
        <span>{initialMovie.overview}</span>
      </div>
    </div>
  );
};

export default Featured;

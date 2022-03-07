import { InfoOutlined, PlayArrow } from '@mui/icons-material';
import React from 'react';
import './featured.scss';

const Featured = ({
  type,
  genres,
  setSelectedCategory,
  setSelectedOptions,
}) => {
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
        src="https://fever.imgix.net/plan/photo/cf44c2fc-d83e-11eb-9522-06551cb39bc6.jpg?auto=compress&auto=format&fm=jpg&w=720&h=720"
        alt="stranger"
      />
      <div className="info">
        <span className="desc"></span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

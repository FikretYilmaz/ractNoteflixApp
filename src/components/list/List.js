import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import API_KEY from '../../js/apiKey';
import GenreItem from '../genreItem/GenreItem';

import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ({ genre, selectedCategory, selectedOptions }) => {
  const [slideNumber, setSlideNumber] = useState(false);
  const [isMoved, setIsMoved] = useState(0);

  const listRef = useRef();

  const [movieList, setMovieList] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    const getRandomListOfMovies = async () => {
      try {
        const key = API_KEY;
        const url = `https://api.themoviedb.org/3`;
        if (!selectedCategory) {
          const api = `${url}/discover/movie?${key}&with_genres=${genre.id}`;
          const response = await fetch(api);
          const data = await response.json();
          const movie = await data.results.slice(0, 10);

          setMovieList(movie);
        } else {
          const api = `${url}/discover/movie?${key}&with_genres=${selectedCategory}&page=1`;
          const response = await fetch(api);
          const data = await response.json();
          const movie = await data.results;
          setSelectedMovies(movie);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getRandomListOfMovies();
  }, [selectedCategory, genre]);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 10) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <>
      {selectedCategory ? (
        <div className="category">
          <span className="categoryTitle">{selectedOptions}</span>
          <div className="wrapper2">
            <div className="container2" ref={listRef}>
              {selectedMovies.map((movie, index) => (
                <GenreItem
                  genreName={selectedOptions}
                  index={index}
                  key={index}
                  movie={movie}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="list">
          <span className="listTitle"> {genre.name}</span>
          <div className="wrapper">
            <ArrowBackIosNewOutlined
              className="sliderArrow left"
              onClick={() => handleClick('left')}
              style={{ display: !isMoved && 'none' }}
            />
            <div className="container" ref={listRef}>
              {movieList.map((movie, index) => (
                <ListItem
                  genreName={genre.name}
                  index={index}
                  key={index}
                  movie={movie}
                />
              ))}
            </div>
            <ArrowForwardIosOutlined
              className="sliderArrow right"
              onClick={() => handleClick('right')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default List;

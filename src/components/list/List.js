import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import API_KEY from '../../js/apiKey';
import GenreItem from '../genreItem/GenreItem';

import ListItem from '../listItem/ListItem';
import './list.scss';

const List = ({
  genre,
  selectedCategory,
  selectedOptions,
  searchMovie,
  savedNote,
}) => {
  const key = API_KEY;
  const url = `https://api.themoviedb.org/3`;
  const [slideNumber, setSlideNumber] = useState(false);
  const [isMoved, setIsMoved] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();

  const [movieList, setMovieList] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);
  useEffect(() => {
    const getMoviesBySearching = async () => {
      try {
        if (searchMovie) {
          setMovieList(searchMovie);
        }
      } catch (err) {
        console.error();
      }
    };
    getMoviesBySearching();
  }, [searchMovie]);

  useEffect(() => {
    const getMoviesBySingleGenre = async () => {
      try {
        const api = `${url}/discover/movie?${key}&with_genres=${genre.id}`;
        const response = await fetch(api);
        const data = await response.json();
        const movie = await data.results.slice(0, 10);
        setMovieList(movie);
      } catch (err) {
        console.error();
      }
    };
    getMoviesBySingleGenre();
  }, [genre]);

  useEffect(() => {
    const getAllGenresOfMovies = async () => {
      try {
        const api = `${url}/discover/movie?${key}&with_genres=${selectedCategory}&page=1`;
        const response = await fetch(api);
        const data = await response.json();
        const movie = await data.results;
        setMovieList(movie);
      } catch (err) {
        console.error(err);
      }
    };
    getAllGenresOfMovies();
  }, [selectedCategory]);

  useEffect(() => {
    const getSavedMovieNotes = async () => {
      try {
        const api = `${url}/movie/${savedNote.movieId}?${key}`;
        const response = await fetch(api);
        const movie = await response.json();
        setSavedMovieList((prev) => [...prev, movie]);
      } catch (err) {
        console.error(err);
      }
    };
    getSavedMovieNotes();
  }, []);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === 'right' && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <>
      {savedNote && (
        <div className="savedMovieCategory">
          <div className="wrapper2">
            <div className="container2" ref={listRef}>
              {savedMovieList.map((movie, index) => (
                <GenreItem
                  genreName={selectedOptions}
                  key={index}
                  movie={movie}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {(selectedCategory || searchMovie) && (
        <div className="category">
          <span className="categoryTitle">{selectedOptions}</span>
          <div className="wrapper2">
            <div className="container2" ref={listRef}>
              {movieList.map((movie, index) => (
                <GenreItem
                  genreName={selectedOptions}
                  key={index}
                  movie={movie}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {genre && (
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

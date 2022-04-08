import './home.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import API_KEY from '../../js/apiKey';
const key = API_KEY;
const url = `https://api.themoviedb.org/3`;
const Home = ({ type }) => {
  const firstUpdate = useRef(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('');
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const api = `${url}/genre/movie/list?${key}`;
        const response = await fetch(api);
        const data = await response.json();
        const genre = await data.genres;
        setGenres(genre);
      } catch (err) {
        console.error(err);
      }
    };
    getAllGenres();
  }, [genres]);

  useEffect(() => {
    const searchMovieByName = async () => {
      try {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        } else {
          const api = `${url}/search/movie?${key}&query=${searchTerm}`;
          const response = await fetch(api);
          const data = await response.json();
          const movie = await data.results;
          setSearchMovie(movie);
        }
      } catch (err) {
        console.error(err);
      }
    };
    searchMovieByName();
  }, [searchTerm]);

  return (
    <div className="home">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Featured
        type={type}
        genres={genres}
        setSelectedCategory={setSelectedCategory}
        setSelectedOptions={setSelectedOptions}
      />
      {/* {myNotes && <List myNotes={myNotes} />} */}

      {(searchTerm && <List searchMovie={searchMovie} />) ||
        (!searchTerm &&
          (selectedCategory === 'All Genres' || selectedCategory === '' ? (
            genres.map((genre, index) => (
              <List key={index} genre={genre} searchTerm={searchTerm} />
            ))
          ) : (
            <List
              selectedCategory={selectedCategory}
              selectedOptions={selectedOptions}
            />
          )))}
    </div>
  );
};

export default Home;

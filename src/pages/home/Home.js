import './home.scss';
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import API_KEY from '../../js/apiKey';
import Search from '../search/Search';
// import { GenreContext } from '../../context/GenreContext';
// import useGenre from '../../hooks/useGenre';
const Home = ({ type }) => {
  // const { genres, setGenres } = useContext(GenreContext);
  // const {} = useGenre();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState('');
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);
  const [movieLoading, setMovieLoading] = useState(false);
  // const [myNotes, setMyNotes] = useState('');

  useEffect(() => {
    const getAllGenres = async () => {
      try {
        const key = API_KEY;
        const url = `https://api.themoviedb.org/3`;
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
        const key = API_KEY;
        const url = `https://api.themoviedb.org/3`;
        const api = `${url}/search/movie?${key}&query=${searchTerm}`;
        const response = await fetch(api);
        const data = await response.json();
        const movie = await data.results;
        setSearchMovie(movie);
        setMovieLoading(true);
      } catch (err) {
        console.error(err);
        setMovieLoading(false);
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

      {movieLoading === true && <Search searchMovie={searchMovie} />}
      
      {selectedCategory === 'All Genres' || selectedCategory === '' ? (
        genres.map((genre, index) => (
          <List key={index} genre={genre} searchTerm={searchTerm} />
        ))
      ) : (
        <List
          selectedCategory={selectedCategory}
          selectedOptions={selectedOptions}
        />
      )}
    </div>
  );
};

export default Home;

// import { useContext, useEffect } from 'react';
// import { GenreContext } from '../context/GenreContext';
// import API_KEY from '../js/apiKey';

// function useGenre() {
//   const { genres, setGenres } = useContext(GenreContext);

//   useEffect(() => {
//     const getRandomList = async () => {
//       try {
//         const key = API_KEY;
//         const url = `https://api.themoviedb.org/3`;
//         const api = `${url}/genre/movie/list?${key}`;
//         const response = await fetch(api);
//         const data = await response.json();
//         const genre = await data.genres.slice(0, 10);
//         setGenres(genre);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getRandomList();
//   }, []);

//   return ;
// }

// export default useGenre;

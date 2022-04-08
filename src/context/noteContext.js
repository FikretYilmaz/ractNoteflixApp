import React, { useState, useEffect, createContext } from 'react';

export const noteContext = createContext();

export const NoteContextProvider = (props) => {
  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('movieList');
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [notesList, setNotesList] = useState(getDataFromLocalStorage());

  const handleDeleteMovieNote = (id) => {
    const filteredNote = notesList.filter((movie) => {
      return movie.movieId !== id;
    });
    setNotesList(filteredNote);
  };

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(notesList));
  }, [notesList]);

  const sharedValues = { notesList, setNotesList, handleDeleteMovieNote };

  return (
    <noteContext.Provider value={sharedValues}>
      {props.children}
    </noteContext.Provider>
  );
};

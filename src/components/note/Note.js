import { CancelOutlined, DeleteOutlined, Done } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { noteContext } from '../../context/noteContext';

import './note.scss';

const Note = ({ movie, showNoteComponent, setShowNoteComponent }) => {
  const [noteValue, setNoteValue] = useState('');

  const { notesList, setNotesList, handleDeleteMovieNote } =
    useContext(noteContext);

  useEffect(() => {
    const findTheCardNote = notesList.find((note) => note.movieId === movie.id);

    if (findTheCardNote) setNoteValue(findTheCardNote.movieNote);
  }, [notesList]);

  const handleCloseMovieNote = async () => {
    setShowNoteComponent('none');
  };

  const handleAddMovieNote = (e) => {
    e.preventDefault();

    let movieNoteObject = {
      movieId: movie.id,
      movieNote: noteValue,
    };
    const findTheCardNote = notesList.find((note) => note.movieId === movie.id);
    if (!findTheCardNote) {
      setNotesList([...notesList, movieNoteObject]);
    } else {
      const prevWithoutOldNote = notesList.filter(
        (note) => note.movieId !== movie.id,
      );

      setNotesList([...prevWithoutOldNote, movieNoteObject]);
    }
    setShowNoteComponent('none');
  };

  return (
    <div className={showNoteComponent}>
      <div className="itemInfo">
        <form autoComplete="off" onSubmit={handleAddMovieNote}>
          <label>{movie.title}</label>
          <input type="text" hidden readOnly value={movie.id} />
          <textarea
            className="userText"
            name="userNote"
            rows="19"
            cols="15"
            onChange={(e) => {
              setNoteValue(e.target.value);
            }}
            value={noteValue}
          ></textarea>
          <div className="actionBottom">
            <DeleteOutlined
              onClick={() => {
                handleDeleteMovieNote(movie.id);
                setShowNoteComponent('none');
              }}
            />
            <Done type="submit" onClick={handleAddMovieNote} />
            <CancelOutlined onClick={handleCloseMovieNote} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Note;

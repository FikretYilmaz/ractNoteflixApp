import { CancelOutlined, DeleteOutlined, Done } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

import './note.scss';

const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('movieList');
  if (data) {
    return JSON.parse(data);
  } else {
    return [{ movieId: 1234, movieNote: 'try' }];
  }
};

const Note = ({ movie, showNoteComponent, setShowNoteComponent }) => {
  const [movieList, setMovieList] = useState(getDataFromLocalStorage());
  const [movieId, setMovieId] = useState(movie.id);
  const [movieNote, setMovieNote] = useState('');

  const handleCloseMovieNote = async () => {
    setShowNoteComponent('none');
  };

  const handleAddMovieNote = (e) => {
    e.preventDefault();

    let movieNoteObject = {
      movieId,
      movieNote,
    };

    setMovieList([...movieList, movieNoteObject]);
    setMovieId('');
    setShowNoteComponent('none');
  };

  const handleDeleteMovieNote = (id) => {
    const filteredNote = movieList.filter((movies, index) => {
      return movies.movieId !== id;
    });
    setMovieList(filteredNote);
    setShowNoteComponent('none');
  };

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(movieList));
  }, [movieList]);

  return (
    <>
      {movieList < 0 && (
        <div className={showNoteComponent}>
          <div className="itemInfo">
            <form autoComplete="off" onSubmit={handleAddMovieNote}>
              <label>{movie.title}</label>
              <input type="text" hidden readOnly value={movieId} />
              <textarea
                className="userText"
                name="userNote"
                rows="19"
                cols="15"
                onChange={(e) => {
                  setMovieNote(e.target.value);
                }}
                value={movieNote}
              ></textarea>
              <div className="actionBottom">
                <DeleteOutlined />
                <Done type="submit" onClick={handleAddMovieNote} />
                <CancelOutlined onClick={handleCloseMovieNote} />
              </div>
            </form>
          </div>
        </div>
      )}

      {movieList.length > 0 &&
        movieList.map((localMovie, index) =>
          localMovie.movieId === movieId ? (
            <>
              <div key={index} className={showNoteComponent}>
                <div className="itemInfo">
                  <form autoComplete="off" onSubmit={handleAddMovieNote}>
                    <label>{movie.title}</label>

                    <input type="text" hidden readOnly value={movieId} />
                    <textarea
                      className="userText"
                      name="userNote"
                      rows="19"
                      cols="15"
                      value={localMovie.movieNote}
                    ></textarea>
                    <div className="actionBottom">
                      <DeleteOutlined
                        onClick={() =>
                          handleDeleteMovieNote(localMovie.movieId)
                        }
                      />
                      <CancelOutlined onClick={handleCloseMovieNote} />
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div key={index} className={showNoteComponent}>
              <div className="itemInfo">
                <form autoComplete="off" onSubmit={handleAddMovieNote}>
                  <label>{movie.title}</label>
                  <input type="text" hidden readOnly value={movieId} />
                  <textarea
                    className="userText"
                    name="userNote"
                    rows="19"
                    cols="15"
                    onChange={(e) => {
                      setMovieNote(e.target.value);
                    }}
                    value={movieNote}
                  ></textarea>
                  <div className="actionBottom">
                    <DeleteOutlined />
                    <Done type="submit" onClick={handleAddMovieNote} />
                    <CancelOutlined onClick={handleCloseMovieNote} />
                  </div>
                </form>
              </div>
            </div>
          ),
        )}
    </>
  );
};

export default Note;

import React, { useContext } from 'react';
import List from '../../components/list/List';
import { noteContext } from '../../context/noteContext';
import './myNotes.scss';
const MyNotesList = () => {
  const { notesList } = useContext(noteContext);

  return (
    <div className="myNotes">
      {' '}
      {notesList.length > 0 ? (
        notesList.map((savedNote, index) => (
          <List key={index} savedNote={savedNote} />
        ))
      ) : (
        <div>You have any saved note</div>
      )}
    </div>
  );
};

export default MyNotesList;

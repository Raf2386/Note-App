import React from 'react';
import { useHistory } from 'react-router-dom';
import './InputNote.css';

const InputNote = ({ value, inputHandler, addNote, edit, editNote, id }) => {
  let history = useHistory();

  return (
    <div className={`inputNote ${edit ? 'editNote' : 'addNote'}`}>
      <input
        type='text'
        className={`${edit ? 'editNote__input' : 'addNote__input'}`}
        onChange={inputHandler}
        value={value}
      />
      <button
        className={`${edit ? 'editNote__btn' : 'addNote__btn'}`}
        onClick={edit ? () => editNote(id, history) : addNote}
      >
        {edit ? (
          <span className='edit-text'>Modifica</span>
        ) : (
          <span className='add-text'>Aggiungi</span>
        )}
        {edit ? (
          <i className='fas fa-pencil-alt'></i>
        ) : (
          <i className='fas fa-plus'></i>
        )}
      </button>
    </div>
  );
};

export default InputNote;

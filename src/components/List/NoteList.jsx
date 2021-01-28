import React from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

const NoteList = ({ notes, removeNote }) => {
  return (
    <div className='list-container'>
      <ul className='list'>
        {notes.map(note => {
          return (
            <li className='note' key={note.id}>
              <div className='note-item'>
                <p>{note.content}</p>
                <div>
                  <Link to={`/${note.id}`} className='get-btn'>
                    <i className='fas fa-eye'></i>
                  </Link>
                  <Link to={`/edit/${note.id}`} className='edit-btn'>
                    <i className='fas fa-pencil-alt'></i>
                  </Link>
                  <button
                    className='delete-btn'
                    onClick={() => removeNote(note.id)}
                  >
                    <i className='fas fa-trash'></i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;

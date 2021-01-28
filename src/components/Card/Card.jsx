import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Card.css';
import InputNote from '../InputNote/InputNote';

const Card = ({ note, editNote, inputHandler, input, getNote, setNote }) => {
  let location = useLocation();
  const param = useParams();

  useEffect(() => {
    getNote(param.id);
    return () => {
      setNote({});
    };
  }, []);

  return (
    <div className='card-container'>
      <div className='card'>
        <h3>ID:</h3>
        <p>{note?.id}</p>
        <h3>Contenuto:</h3>
        <p>{note?.content}</p>
        {location.pathname.includes('edit') && (
          <InputNote
            edit
            editNote={editNote}
            inputHandler={inputHandler}
            value={input}
            id={param.id}
          />
        )}
      </div>
      <Link to='/' className='back'>
        <i className='fas fa-long-arrow-alt-left'></i>
      </Link>
    </div>
  );
};

export default Card;

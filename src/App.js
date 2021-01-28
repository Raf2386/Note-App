import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import InputNote from './components/InputNote/InputNote';
import NoteList from './components/List/NoteList';
import Card from './components/Card/Card';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [note, setNote] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await axios.get(
          'http://80.211.237.86:8080/note/get-all'
        );
        setNotes(result.data);
        setError('');
      } catch (error) {
        setError(error);
      }
    };
    fetchNotes();
  }, []);

  const inputHandler = e => {
    setInput(e.target.value);
  };

  const addNote = async () => {
    if (checkInput(input)) return;
    try {
      const result = await axios.post('http://80.211.237.86:8080/note/create', {
        content: input,
      });
      setNotes([...notes, result.data]);
      setError('');
    } catch (error) {
      setError(error);
    }
    setInput('');
  };

  const checkInput = input => {
    return input === '' ? true : false;
  };

  const editNote = async (id, history) => {
    if (checkInput(input)) return;
    try {
      await axios.put(`http://80.211.237.86:8080/note/edit`, {
        id: +id,
        content: input,
      });

      setNotes(
        notes.map(note => {
          if (note.id === +id) {
            return { ...note, content: input };
          }
          return note;
        })
      );
      setError('');
    } catch (error) {
      setError(error);
    }
    setInput('');
    history.push('/');
  };

  const getNote = async id => {
    try {
      const result = await axios.get(
        `http://80.211.237.86:8080/note/get/${id}`
      );
      setNote(result.data);
      setError('');
    } catch (error) {
      setError(error);
    }
  };

  const removeNote = async id => {
    try {
      await axios.delete(`http://80.211.237.86:8080/note/delete/${id}`);
      setNotes([...notes.filter(note => note.id !== id)]);
      setError('');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <BrowserRouter>
      <div className='App'>
        <header>
          <h1>Note</h1>
        </header>
        <Switch>
          <Route exact path='/:id'>
            <Card note={note} setNote={setNote} getNote={getNote} />
          </Route>
          <Route exact path='/edit/:id'>
            <Card
              note={note}
              setNote={setNote}
              getNote={getNote}
              editNote={editNote}
              inputHandler={inputHandler}
              value={input}
            />
          </Route>
          <Route path='/'>
            <NoteList notes={notes} removeNote={removeNote} />
            <InputNote
              inputHandler={inputHandler}
              value={input}
              addNote={addNote}
            />
          </Route>
        </Switch>
        {error && <h3 className='error'>Operazione non riuscita...Riprova</h3>}
      </div>
    </BrowserRouter>
  );
};

export default App;

import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { TableCharacters } from './components/Table';
import Characters from './components/Characters/Characters';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({
      pathname: '/table',
      search: '?page=1',
    });
  }, []);

  return (
    <div className="App">
      <Characters />
    </div>
  );
}

export default App;

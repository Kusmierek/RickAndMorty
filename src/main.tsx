import { TablePagination } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import CharacterCard from './components/CharacterCard/CharacterCard';
import Characters from './components/Characters/Characters';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/:pageid" element={<Characters />} />
          <Route path="/" element={<App />} />
          <Route
            path="table/character/:characterid"
            element={<CharacterCard />}
          />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

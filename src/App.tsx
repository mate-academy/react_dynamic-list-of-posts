import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { ListApp } from './components/listApp';
import { ListContext } from './components/listContext';

export const App: React.FC = () => {
  return (
    <ListContext>
      <ListApp />
    </ListContext>
  );
};

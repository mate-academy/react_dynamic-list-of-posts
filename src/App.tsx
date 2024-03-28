import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { ListContext } from './components/listContext';
import { ListApp } from './components/listApp';

export const App: React.FC = () => {
  return (
    <ListContext>
      <ListApp />
    </ListContext>
  );
};

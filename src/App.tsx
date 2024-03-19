import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { ListProvider } from './components/ListContext';
import { AppList } from './components/AppList';

export const App: React.FC = () => {
  return (
    <ListProvider>
      <AppList />
    </ListProvider>
  );
};

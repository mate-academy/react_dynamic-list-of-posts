import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import React from 'react';
import { AppState } from './components/AppState';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  return (
    <AppState>
      <PostsApp />
    </AppState>
  );
};

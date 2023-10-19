import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsApp } from './components/PostsApp';
import { PostsProvider } from './components/PostsContext';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <PostsApp />
    </PostsProvider>
  );
};

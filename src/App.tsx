import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './components/PostContext';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <PostsApp />
    </PostsProvider>
  );
};

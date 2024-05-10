import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './postsContext';
import { ListApp } from './ListApp/ListApp';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <ListApp />
    </PostsProvider>
  );
};

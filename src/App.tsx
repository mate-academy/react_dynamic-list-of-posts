import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './PostsContext';
import { PostsApp } from './components/PostsApp/PostsApp.tsx/PostsApp';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <PostsApp />
    </PostsProvider>
  );
};

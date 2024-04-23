import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsAppProvider } from './components/AppContext';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  return (
    <PostsAppProvider>
      <PostsApp />
    </PostsAppProvider>
  );
};

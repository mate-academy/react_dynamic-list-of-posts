import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { GlobalStateProvider } from './Store';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <PostsApp />
    </GlobalStateProvider>
  );
};

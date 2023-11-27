import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './context/PostsContext';
import { Main } from './components/Main';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <Main />
    </PostsProvider>
  );
};

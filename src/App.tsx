import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsProvider } from './context/postsContext';
import { Home } from './components/Home';

export const App: React.FC = () => (
  <PostsProvider>
    <Home />
  </PostsProvider>
);

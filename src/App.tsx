import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { UsersProvider } from './components/Users/UserContext';
import { PostsProvider } from './components/Posts/PostContext';
import { CommentsProvider } from './components/Comments/CommentContext';
import { PostsApp } from './components/PostsApp';

export const App: React.FC = () => {
  return (
    <UsersProvider>
      <PostsProvider>
        <CommentsProvider>
          <PostsApp />
        </CommentsProvider>
      </PostsProvider>
    </UsersProvider>
  );
};

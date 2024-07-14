import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { UserProvider } from './components/UsersContext';
import { PostProvider } from './components/PostContext';
import { CommentProvider } from './components/CommentContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <PostProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </PostProvider>
  </UserProvider>,
);

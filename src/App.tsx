import React from 'react';
import { PostApp } from './PostApp';
import { PostsProvider } from './components/PostContext';

export const App: React.FC = () => {
  return (
    <PostsProvider>
      <PostApp />
    </PostsProvider>
  );
};

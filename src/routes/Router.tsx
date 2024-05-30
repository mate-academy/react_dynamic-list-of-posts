import { Route, Routes } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import React from 'react';
import { Post } from '../types/Post';

type RouterProps = {
  posts: Post[];
};

export const Router: React.FC<RouterProps> = ({ posts }) => {
  return (
    <Routes>
      <Route path="/:#userId" element={<PostsList posts={posts} />}></Route>
    </Routes>
  );
};

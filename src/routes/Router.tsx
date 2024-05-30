import { Route, Routes } from 'react-router-dom';
import { PostsList } from '../components/PostsList';
import React from 'react';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/:#userId" element={<PostsList />}></Route>
    </Routes>
  );
};

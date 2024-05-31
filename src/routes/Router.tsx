import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { PostsPage } from '../pages/PostsPage';
import { App } from '../App';
import { Home } from '../pages/Home';

export const Router: React.FC = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/user/:userId" element={<PostsPage />} />
      </Route>
    </Routes>
  );
};

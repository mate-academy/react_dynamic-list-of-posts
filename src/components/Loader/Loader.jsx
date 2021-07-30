import React from 'react';
import { PostsList } from '../PostsList/PostsList';
import './Loader.scss';

export const Loader = () => (
  <div className="Loader">
    <div className="Loader__content" />
    <PostsList />
  </div>
);

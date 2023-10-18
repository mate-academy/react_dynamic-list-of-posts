import React from 'react';
import { PostsContext } from '../components/PostsContext';

export const usePosts = () => React.useContext(PostsContext);

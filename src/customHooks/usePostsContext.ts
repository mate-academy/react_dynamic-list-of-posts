import { useContext } from 'react';
import { PostsContext } from '../contexts/PostsContext';

export const usePostsContext = () => useContext(PostsContext);

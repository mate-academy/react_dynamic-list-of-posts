import { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';

export const usePostsContext = () => {
  return useContext(PostsContext);
};

import { useContext } from 'react';
import { PostsContext } from '../context/ListContext';

export const usePostsContext = () => useContext(PostsContext);

import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { PostContext } from '../context/post.context';

export const usePost = () => {
  const {
    posts,
    postsLoading,
    postsLoadingError,
    onPostClosing,
    selectedPost,
    onPostSelecting,
  } = useContext(PostContext);

  return {
    posts,
    postsLoading,
    postsLoadingError,
    selectedPost,
    onPostSelecting,
    onPostClosing,
  };
};

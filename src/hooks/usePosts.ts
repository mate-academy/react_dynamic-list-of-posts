import { useEffect, useState } from 'react';
import { Post } from '../types';
import * as postsService from '../api/posts';

export const usePosts = (selectedUserId: number = 0) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadSelectedUserPosts = () => {
    if (!selectedUserId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    postsService
      .getUserPosts(selectedUserId)
      .then(setPosts)
      .catch(() => setErrorMessage('Unable to load posts'))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadSelectedUserPosts, [selectedUserId]);

  return {
    posts,
    selectedPost,
    setSelectedPost,
    isLoading,
    setIsLoading,
    errorMessage,
  };
};

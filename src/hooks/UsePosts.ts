import { useCallback, useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type UsePostReturn = {
  userPosts: Post[];
  isLoading: boolean;
  hasError: boolean;
  selectedUserId: number | null;
  selectedPost: Post | null;
  changeUser: (userId: number | null) => void;
  selectPost: (post: Post | null) => void;
};

export const usePosts = (): UsePostReturn => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const changeUser = useCallback((userId: number | null): void => {
    setSelectedUserId(userId);
  }, []);

  const selectPost = (post: Post | null) => {
    if (selectedPost?.id === post?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  useEffect(() => {
    if (selectedUserId === null) {
      setUserPosts([]);
      setSelectedPost(null);
      setHasError(false);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setHasError(false);
    setSelectedPost(null);

    client
      .get<Post[]>(`/posts?userId=${selectedUserId}`)
      .then(data => setUserPosts(data))
      .catch(() => {
        setUserPosts([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [selectedUserId]);

  return {
    userPosts,
    isLoading,
    hasError,
    selectedUserId,
    selectedPost,
    changeUser,
    selectPost,
  };
};

import { Post } from '../types/Post';
import { useEffect, useState } from 'react';

import { getPosts } from '../api/getPosts';

export function usePosts(userId: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (!userId) {
      setPosts([]);

      return;
    }

    setIsLoading(true);
    setErrorText('');

    getPosts(userId)
      .then(setPosts)
      .catch(() => setErrorText('Unable to get posts'))
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { posts, setPosts, isLoading, errorText };
}

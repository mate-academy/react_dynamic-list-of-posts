import { useEffect, useState } from 'react';
import { getPosts } from '../api/todos';
import { Post } from '../types/Post';

export function usePosts(userId: number | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setPosts([]);

      return;
    }

    setIsLoading(true);
    setHasError(false);

    getPosts(userId)
      .then(setPosts)
      .catch(() => {
        setPosts([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { posts, isLoading, hasError };
}

import { useEffect, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Post } from '../../types/Post';

export const usePosts = (userId: number | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setLoading(true);
    client
      .get<Post[]>(`/posts?userId=${userId}`)
      .then(setPosts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { posts, loading, error };
};

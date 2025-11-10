import { useEffect, useState } from 'react';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

export const useComments = (postId: number | null) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!postId) {
      return;
    }

    setLoading(true);
    client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [postId]);

  return { comments, loading, error };
};

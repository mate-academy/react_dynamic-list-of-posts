import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type UseComments = {
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  createComment: (data: Omit<Comment, 'id'>) => Promise<Comment>;
  deleteComment: (id: number) => Promise<void>;
  failedDeleteIds: Set<number>;
  clearDeleteError: (id: number) => void;
};

export const useComments = (postId: number | null): UseComments => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [failedDeleteIds, setFailedDeleteIds] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    if (postId === null) {
      setComments([]);
      setIsLoading(false);
      setHasError(false);
      setFailedDeleteIds(new Set());

      return;
    }

    setIsLoading(true);
    setHasError(false);

    client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(setComments)
      .catch(() => {
        setComments([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const createComment = async (data: Omit<Comment, 'id'>) => {
    const created = await client.post<Comment>('/comments', data);

    setComments(prev => [...prev, created]);

    return created;
  };

  const deleteComment = async (id: number) => {
    const prevComments = comments;

    setComments(prev => prev.filter(c => c.id !== id));
    setFailedDeleteIds(s => {
      const n = new Set(s);

      n.delete(id);

      return n;
    });

    try {
      await client.delete(`/comments/${id}`);
    } catch {
      setComments(prevComments);
      setFailedDeleteIds(s => {
        const n = new Set(s);

        n.add(id);

        return n;
      });
      throw new Error('Delete failed');
    }
  };

  const clearDeleteError = (id: number) => {
    setFailedDeleteIds(s => {
      const n = new Set(s);

      n.delete(id);

      return n;
    });
  };

  return {
    comments,
    isLoading,
    hasError,
    createComment,
    deleteComment,
    failedDeleteIds,
    clearDeleteError,
  };
};

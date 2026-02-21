import { useEffect, useState } from 'react';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export function useComments(postId: number | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setCommentsLoading(false);
      setCommentsError(false);

      return;
    }

    const loadComments = async () => {
      setCommentsLoading(true);
      setCommentsError(false);
      try {
        const data = await client.get<Comment[]>(`/comments?postId=${postId}`);

        setComments(data);
      } catch {
        setCommentsError(true);
      } finally {
        setCommentsLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const handleDeleteComment = async (id: number) => {
    let snapshot: Comment[] = [];

    setComments(prev => {
      snapshot = [...prev];

      return prev.filter(c => c.id !== id);
    });

    try {
      await client.delete(`/comments/${id}`);
    } catch {
      setComments(snapshot);
      setCommentsError(true);
    }
  };

  const handleAddComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    if (!postId) {
      return;
    }

    try {
      const newComment = await client.post<Comment>('/comments', {
        postId,
        name,
        email,
        body,
      });

      setComments(prev => [...prev, newComment]);
    } catch (error) {
      setCommentsError(true);

      throw error;
    }
  };

  return {
    comments,
    commentsLoading,
    commentsError,
    handleDeleteComment,
    handleAddComment,
  };
}

import { useEffect, useRef, useState } from 'react';
import { getComments, delComment, postComment } from '../api/todos';
import { Comment } from '../types/Comment';

export function useComments(postId: number | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const tempIdRef = useRef(-1);

  useEffect(() => {
    if (!postId) {
      setComments([]);

      return;
    }

    setIsLoading(true);
    setHasError(false);

    getComments(postId)
      .then(setComments)
      .catch(() => {
        setComments([]);
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const deleteComment = async (commentId: number) => {
    setHasError(false);

    const prevComments = comments;

    setComments(prev => prev.filter(c => c.id !== commentId));

    try {
      await delComment(commentId);
    } catch {
      setComments(prevComments);
      setHasError(true);
    }
  };

  const addComment = async (name: string, email: string, body: string) => {
    if (!postId) {
      return;
    }

    setHasError(false);
    setIsAdding(true);

    const tempId = tempIdRef.current;

    tempIdRef.current -= 1;

    const tempComment: Comment = {
      id: tempId,
      postId,
      name,
      email,
      body,
    };

    setComments(prev => [...prev, tempComment]);

    try {
      const savedComment = await postComment(postId, name, email, body);

      setComments(prev =>
        prev.map(comment =>
          comment.id === tempComment.id ? savedComment : comment,
        ),
      );
    } catch {
      setComments(prev =>
        prev.filter(comment => comment.id !== tempComment.id),
      );
      setHasError(true);
    } finally {
      setIsAdding(false);
    }
  };

  return { comments, isLoading, isAdding, hasError, deleteComment, addComment };
}

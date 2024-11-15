import { useCallback, useState } from 'react';
import { Comment } from '../types/Comment';
import { addComment, deleteComment } from '../api/comments';
import { getCommentsByPostId } from '../api/posts';

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = useCallback(() => {
    setIsLoading(true);

    getCommentsByPostId(postId)
      .then(res => setComments(res))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleAddComment = async (
    comment: Omit<Comment, 'id'>,
  ): Promise<void> => {
    try {
      const res = await addComment(comment);

      if (res.postId) {
        setComments(prevState => [...prevState, res]);
      } else {
        setError('Fetch comments with error');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);

    setComments(comments.filter(comment => comment.id !== id));
  };

  return {
    isLoading,
    error,
    comments,

    handleAddComment,
    handleDeleteComment,
    fetchComments,
  };
};

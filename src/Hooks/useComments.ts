import { Comment } from '../types/Comment';
import { getComments } from '../api/getComments';
import { useEffect, useState } from 'react';

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [stillLoading, setStillLoading] = useState(false);
  const [hasErrorText, setHasErrorText] = useState('');

  useEffect(() => {
    if (!postId) {
      return;
    }

    setComments([]);
    setStillLoading(true);
    setHasErrorText('');

    getComments(postId)
      .then(setComments)
      .catch(() => setHasErrorText('Unable to get comments'))
      .finally(() => setStillLoading(false));
  }, [postId]);

  return { comments, setComments, stillLoading, hasErrorText };
}

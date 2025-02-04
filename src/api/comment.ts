import { client } from '../utils/fetchClient';

import { Comment } from '../types/Comment';

export const getComments = (
  postId: number,
  signal: AbortSignal | null = null,
) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`, signal);
};

export const createComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

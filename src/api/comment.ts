import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId?: number) => {
  const url = postId !== undefined ? `/comments?postId=${postId}` : '/comments';

  return client.get<Comment[]>(url);
};

export const postComment = (
  {
    postId, name, email, body,
  }: Omit<Comment, 'id'>,
) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

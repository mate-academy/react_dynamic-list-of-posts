import { AppComment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<AppComment[]>(`/comments?postId=${postId}`);
};

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<AppComment, 'id'>) => {
  return client.post<AppComment>('/comments', { postId, name, email, body });
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

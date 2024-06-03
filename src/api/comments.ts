import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createPostComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', { postId, name, email, body });
};

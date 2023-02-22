import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = async (postId: number) => {
  const comments = await client.get<Comment[]>(`/comments?postId=
  ${postId}`);

  return comments || null;
};

export const addCommentToList = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

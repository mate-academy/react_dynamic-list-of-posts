import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = async (postId: number) => {
  const response = await client.get<Comment[]>(`/comments?postId=${postId}`);

  return response;
};

export const deleteCommentById = async (commentId: number) => {
  const response = await client.delete(`/comments/${commentId}`);

  return response;
};

export const addComment = async (
  comment: Omit<Comment, 'id'>,
): Promise<Comment> => {
  const response = await client.post<Comment>('/comments', comment);

  return response;
};

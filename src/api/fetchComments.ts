import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const addNewComment = (data: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post('/comments', data);
};

export const deletePostComment = (id: number): Promise<unknown> => {
  return client.delete(`/comments/${id}`);
};

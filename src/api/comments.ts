import { client } from '../libs/utils/fetchClient';
import { Comment } from '../libs/types';

export const loadComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (id: number): Promise<Comment> => {
  return client.delete<Comment>(`/comments/${id}`);
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

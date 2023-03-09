import { client } from '../utils/axiosClient';
import { IComment } from '../types/IComment';

export const getPostComments = (postId: number) => {
  return client.get<IComment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<IComment, 'id'>) => {
  return client.post<IComment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

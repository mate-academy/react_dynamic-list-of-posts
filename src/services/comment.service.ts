import { PostComment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<PostComment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};

export const addPostComment = (data: Omit<PostComment, 'id'>) => {
  return client.post<PostComment>(`/comments`, data);
};

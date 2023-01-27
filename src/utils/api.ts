import { Comment, IPost, User } from '../types';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users?limit=20');
};

export const getPosts = (userId: number) => {
  return client.get<IPost[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

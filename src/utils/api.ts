import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComment = (postId: null | number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const getDeleteComment = (postId: null | number) => {
  return client.delete(`/comments/${postId}`);
};

export const newComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

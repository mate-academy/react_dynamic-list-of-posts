import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addingCommentRequest = (data: any, postId: number) => {
  return client.post<Comment>('/comments', { ...data, postId });
};

export const deletingCommentRequest = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};

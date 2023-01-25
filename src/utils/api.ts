import { Comment, Post, User } from '../types';
import { client } from './fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${userId}`);
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const postComment = (data: Comment): Promise<Comment> => {
  return client.post('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

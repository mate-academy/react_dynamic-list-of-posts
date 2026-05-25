import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getUserPosts = (id: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${id}`);
};

export const getPostComments = (id: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${id}`);
};

export const postComment = (comment: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post('/comments', comment);
};

export const deleteComment = (id: number): Promise<unknown> => {
  return client.delete(`/comments/${id}`);
};

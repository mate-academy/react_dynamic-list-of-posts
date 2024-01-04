import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

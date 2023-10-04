import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get('/users');
};

export const getPosts = (id?: number) => {
  return client.get(`/posts?userId=${id}`);
};

export const getComments = (id?: number) => {
  return client.get(`/comments?postId=${id}`);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const getPost = (id?: number) => {
  return client.get(`/posts/${id}`);
};

export const addComment = (postId: number, data: Comment) => {
  return client.post(`/comments?postId=${postId}`, data);
};

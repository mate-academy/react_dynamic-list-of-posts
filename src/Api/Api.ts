import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get('/users');
};

export const getPosts = (id?: number) => {
  return client.get(`/posts?userId=${id}`);
};

export const getPost = (id?: number) => {
  return client.get(`/posts/${id}`);
};

export const getComments = (id?: number) => {
  return client.get(`/comments?postId=${id}`);
};

export const postData = (url: string, data: Post) => {
  return client.post(url, data);
};

export const updateComments = (id: number, data: Comment) => {
  return client.patch(`/comments?postId=${id}`, data);
};

export const deleteData = (url: string) => {
  return client.delete(url);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (postId: number, data: Comment) => {
  return client.post(`/comments?postId=${postId}`, data);
};

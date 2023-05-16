import { CommentPostBody } from '../types/CommentPostBody';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get(`/comments?postId=${postId}`);
};

export const postComment = (data: CommentPostBody) => {
  return client.post('/comments', data);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

import { CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get(`/posts?userId=${userId}`);
};

export const getUserPostComments = (postId: number) => {
  return client.get(`/comments?postId=${postId}`);
};

export const addNewComment = (newComment: CommentData) => {
  return client.post('/comments', newComment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

import { Comment, Post, User } from '../types';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};

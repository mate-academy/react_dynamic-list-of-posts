import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const getAllUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getUserPostById = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

export const getUserCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

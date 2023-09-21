/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteCommentById = (commId: number) => {
  return client.delete<Comment>(`/comments/${commId}`);
};

export const addComment = (data: any) => {
  return client.post<Comment>('/comments', data);
};

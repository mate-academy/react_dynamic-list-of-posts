import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = async () => {
  const response = await client.get<User[]>('/users');

  return response;
};

export const getPosts = async (userId: number) => {
  const response = await client.get<Post[]>(`/posts?userId=${userId}`);

  return response;
};

export const getComments = async (postId: number) => {
  const response = await client.get<Comment[]>(`/comments?postId=${postId}`);

  return response;
};

export const deleteComment = async (commentId: number) => {
  const response = await client.delete(`/comments/${commentId}`);

  return response;
};

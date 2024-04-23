import { client } from './fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUserPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = ({ ...data }) => {
  return client.post<Comment>(`/comments`, { ...data });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

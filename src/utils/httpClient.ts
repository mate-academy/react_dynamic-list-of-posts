import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (comment: Comment) => {
  return client.post<Comment>(`/comments`, comment);
};

export const deleteComment = (postId: number) => {
  return client.delete(`/comments/${postId}`);
};

import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = (): Promise<User[]> => {
  return client.get('/users');
};

export const getPosts = (userId?: number): Promise<Post[]> => {
  return client.get(`/posts?userId=${userId}`);
};

export const getComments = (postId?: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

export const addComment = (comment: CommentData): Promise<Comment> => {
  return client.post(`/comments`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

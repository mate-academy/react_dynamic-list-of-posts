import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getUsersPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', newComment);
};

export const deleteComment = (deleteCommentId: number) => {
  return client.delete(`/comments/${deleteCommentId}`);
};

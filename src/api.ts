import { client } from './utils/fetchClient';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const getUsers = (): Promise<User[]> => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number): Promise<Post[]> => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const createComment = (data: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', data);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

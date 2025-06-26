import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (postId: Post['id']) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = (body: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', body);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

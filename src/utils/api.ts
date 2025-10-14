import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const getUsers = () => client.get<User[]>('/users');
export const getPostsByUser = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getCommentsByPost = (postId: number) => {
  return client.get<Comment[]>(`/commets?postId=${postId}`);
};

export const createComment = (payload: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', payload);
};

export const deleteComment = (id: number) => client.delete(`/comments/${id}`);

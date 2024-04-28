import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getPost = () => {
  return client.get<Post[]>(`/posts`);
};

export const getComments = () => {
  return client.get<Comment[]>('/comments');
};

export const addComment = (newComment: Omit<Comment, 'id'>) => {
  return client.post<Comment[]>('/comments', newComment);
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

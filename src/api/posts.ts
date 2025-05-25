import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPosts = () => {
  return client.get<Post[]>(`/posts`);
};

export const getUsers = () => {
  return client.get<User[]>(`/users`);
};

export const getComments = () => {
  return client.get<Comment[]>(`/comments`);
};

export const addComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

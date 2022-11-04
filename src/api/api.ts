import { client } from '../utils/fetchClient';

import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = () => {
  return client.get<User[]>('/users');
};

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getComments = (userId: number) => {
  return client.get<Comment[]>(`/comments?postId=${userId}`);
};

export const addComments = (data: Comment) => {
  return client.post<Comment[]>('/comments', data);
};

export const deleteComments = (id: number) => {
  return client.delete(`/comments/${id}`);
};

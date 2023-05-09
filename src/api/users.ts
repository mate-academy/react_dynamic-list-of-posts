import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getPosts = (url: string, userId: number) => {
  return client.get<Post[]>(`${url}?userId=${userId}`);
};

export const getComments = (url: string, postId: number) => {
  return client.get<Comment[]>(`${url}?postId=${postId}`);
};

export const post = <T>(url: string, data: Comment) => {
  return client.post<T>(url, data);
};

export const removeComment = (url: string, id: number) => {
  return client.delete(`${url}/${id}`);
};

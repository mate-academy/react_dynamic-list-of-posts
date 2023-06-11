import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getPosts = (url: string) => {
  return client.get<Post[]>(url);
};

export const getComments = (url: string) => {
  return client.get<Comment[]>(url);
};

export const addComment = (url: string, comment: Comment) => {
  return client.post<Comment[]>(url, comment);
};

export const deleteComment = (url: string) => {
  return client.delete(url);
};

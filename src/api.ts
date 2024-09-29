import { User } from './types/User';
import { Post } from './types/Post';
import { Comment, CommentWithoutId } from './types/Comment';
import { client } from './utils/fetchClient';

export const getUsers = (url: string) => {
  return client.get<User[]>(url);
};

export const getPosts = (url: string) => {
  return client.get<Post[]>(url);
};

export const getComments = (url: string) => {
  return client.get<Comment[]>(url);
};

export const deleteData = (url: string) => {
  return client.delete(url);
};

export const postComment = (url: string, createdComment: CommentWithoutId) => {
  return client.post<Comment>(url, createdComment);
};

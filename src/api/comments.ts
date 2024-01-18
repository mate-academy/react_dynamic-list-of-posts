import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (url: string) => {
  return client.get<Comment[]>(url);
};

export const addComment = (url: string, newComment: Comment) => {
  return client.post<Comment>(url, newComment);
};

export const deleteComment = (url: string) => {
  return client.delete(url);
};

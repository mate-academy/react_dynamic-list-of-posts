import { CommentFormData } from '../types';
import { client } from './fetchClient';

export const postComment = (data: CommentFormData) => {
  return client.post(`/comments`, data);
};

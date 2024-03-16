import { client } from './fetchClient';
import { Comment } from '../types';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

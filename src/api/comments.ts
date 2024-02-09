import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${postId}`);
};

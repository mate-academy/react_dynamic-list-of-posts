import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getComments = async (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

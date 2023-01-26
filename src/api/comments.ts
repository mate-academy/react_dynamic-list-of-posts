import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getByPostId = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

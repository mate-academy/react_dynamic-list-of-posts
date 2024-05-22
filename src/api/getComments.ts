import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (id: number | undefined) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

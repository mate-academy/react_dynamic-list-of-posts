import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getCommentsForThisPost = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

import { client } from '../utils/fetchClient';
import { Comment as com } from '../types/Comment';

export const getComments = (postId: number) => {
  return client.get<com[]>(`/comments?postId=${postId}`);
};

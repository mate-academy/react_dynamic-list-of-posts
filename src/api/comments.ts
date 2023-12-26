import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostCommentsList = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getCommentsOfPost = async (postId: number): Promise<Comment[]> => (
  client.get<Comment[]>(`/comments?postId=${postId}`)
);

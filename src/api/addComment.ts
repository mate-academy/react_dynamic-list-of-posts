import { client } from '../utils/fetchClient';
import { CommentData, Comment } from '../types/Comment';

export const addComment = (data: CommentData, postId: number) => {
  return client.post<Comment>(`/comments`, { ...data, postId });
};

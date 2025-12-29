import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export interface CommentCreateData extends CommentData {
  postId: number;
}

export const commentsPost = (data: CommentCreateData) => {
  return client.post<Comment>('/comments', data);
};

import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) => {
  return client.get<CommentData[]>(`/comments?postId=${postId}`);
};

export const createComment = ({
  name, email, body, postId,
}: Comment): Promise<Comment> => {
  return client.post<Comment>('/comments', {
    name, email, body, postId,
  });
};

export const removeComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

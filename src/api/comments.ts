import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsById = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteCommentById = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

export const createComment = ({
  name, email, body, postId,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    name, email, body, postId,
  });
};

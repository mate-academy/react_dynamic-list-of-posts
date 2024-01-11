import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComment = () => {
  return client.get<Comment[]>('/comments');
};

export const createComment = ({
  postId, name, email, body,
}: CommentData) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

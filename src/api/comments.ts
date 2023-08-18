import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentById = (id: number) => {
  return client.get<Comment[]>(`/comments?postId=${id}`);
};

export const deleteCommentById = (id: number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = ({
  postId,
  name,
  email,
  body,
}: Omit<Comment, 'id'>) => {
  return client.post<Comment>('/comments', {
    postId,
    name,
    email,
    body,
  });
};

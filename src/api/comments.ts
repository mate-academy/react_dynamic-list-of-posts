import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsByPostId = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = ({ id, postId, name, email, body }: Comment) => {
  return client.post<Comment>('/comments', {
    id,
    postId,
    name,
    email,
    body,
  });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

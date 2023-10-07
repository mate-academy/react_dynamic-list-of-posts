import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const addComment = ({
  postId, name, email, body,
}: CommentData) => {
  return client.post<Comment>('/comments', {
    postId, name, email, body,
  });
};

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
};

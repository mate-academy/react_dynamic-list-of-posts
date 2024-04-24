import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getComments = (postId: number) =>
  client.get(`/comments?postId=${postId}`);

export const addComment = (comment: Comment) => {
  return client.post('/comments', comment);
}

export const deleteComment = (id: number) => {
  return client.delete(`/comments/${id}`);
}

import { client } from '../utils/fetchClient';
import { Comment, CommentDataToServer } from '../types/Comment';

export const getComments = (id: number): Promise<Comment[]> => {
  return client.get(`/comments?postId=${id}`);
};

export const deleteComment = (id:number) => {
  return client.delete(`/comments/${id}`);
};

export const addComment = (comment: CommentDataToServer): Promise<Comment> => {
  return client.post('/comments', comment);
};

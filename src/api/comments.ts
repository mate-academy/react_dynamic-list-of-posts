import { Comment, CreateCommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

const PATH = '/comments';

export const getCommentsByPost = (postId: number) => {
  return client.get<Comment[]>(`${PATH}?postId=${postId}`);
};

export const addComment = (comment: CreateCommentData) => {
  return client.post<Comment>(PATH, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`${PATH}/${commentId}`);
};

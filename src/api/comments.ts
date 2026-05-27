import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getCommentsByPost = (postId: number) =>
  client.get<Comment[]>(`/comments?postId=${postId}`);

export const addComment = (postId: number, commentData: CommentData) =>
  client.post<Comment>('/comments', {
    postId,
    ...commentData,
  });

export const deleteComment = (commentId: number) =>
  client.delete(`/comments/${commentId}`);

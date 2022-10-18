import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

export const getCommentsById = async (postId: number) => {
  const comments = await client.get<Comment[]>(`/comments?postId=${postId}`);

  return comments;
};

export const addComment = async (commentData: CommentData) => {
  return client.post<CommentData>('/comments', commentData);
};

export const deleteComment = async (commentId: number) => {
  return client.delete(`/comments1/${commentId}`);
};

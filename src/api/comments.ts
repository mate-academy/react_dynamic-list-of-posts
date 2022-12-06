/* eslint-disable @typescript-eslint/return-await */
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = async (postId: number) => {
  return await client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = async (commentId: number) => {
  await client.delete(`/comments/${commentId}`);
};

export const addComment = async (comment: Comment) => {
  return await client.post<Comment>('/comments', comment);
};

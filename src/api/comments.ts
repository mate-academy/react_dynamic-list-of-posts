import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getPostComments = async (postId: number) => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return await client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const deleteComment = async (commentId: number) => {
  await client.delete(`/comments/${commentId}`);
};

export const addComment = async (comment: Comment) => {
  const newComment = await client.post<Comment>('/comments', comment);

  return newComment;
};

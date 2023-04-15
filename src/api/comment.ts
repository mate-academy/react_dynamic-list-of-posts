import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

export const getCommentsOfPost = async (postId: number): Promise<Comment[]> => (
  client.get<Comment[]>(`/comments?postId=${postId}`)
);

export const addComment = (comment: Omit<Comment, 'id'>): Promise<Comment> => (
  client.post<Comment>('/comments', comment)
);

export const deleteComment = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);

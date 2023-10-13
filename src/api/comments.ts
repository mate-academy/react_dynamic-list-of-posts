import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getCommentsFromServer = (postId: number) => (
  client.get<Comment[]>(`/comments?postId=${postId}`)
);

export const deleteCommentFromServer = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);

export const postNewComment = (comment: CommentData) => (
  client.post<Comment>('/comments', comment)
);

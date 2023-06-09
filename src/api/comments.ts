import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const commentsFromServer = (postID: number) => client
  .get<Comment[]>(`/comments?postId=${postID}`);
export const createCommentOnServer = (
  postId: number,
  name: string,
  email: string,
  comment: string,
) => client
  .post<Comment>('/comments', {
  postId,
  name,
  email,
  body: comment,
});

export const deleteCommentOnServer = (commentId: number) => client
  .delete(`/comments/${commentId}`);

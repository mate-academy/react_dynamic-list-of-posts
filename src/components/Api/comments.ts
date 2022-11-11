import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

// sending request to get comments by post Id
export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// sending request to add new comment by post Id in API serever
export const postComment = (postId: number, comment: Comment) => {
  return client.post<Comment>(`/comments?postId=${postId}`, comment);
};

// sending request to delete comment by comment Id
export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

export const postComment = (newComment: Comment) => {
  return client.post('/comments', newComment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`/comments/${commentId}`);
};

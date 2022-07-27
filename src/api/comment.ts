import { get, post, remove } from './api';
import Comment from '../components/types/Comment';

export const getCommentsByPostId = (postId: number): Promise<Comment[]> => {
  return get(`/comments?postId=${postId}`);
};

export const deletePostComment = (commentId: number): Promise<Comment> => {
  return remove(`/comments/${commentId}`);
};

export function postComment(newComment: Comment) {
  return post('/comments', newComment);
}

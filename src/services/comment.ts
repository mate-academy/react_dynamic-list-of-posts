import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getPostsComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function addNewComment(newComment: Omit<Comment, 'id'>) {
  return client.post<Comment>(`/comments`, newComment);
}

export function deleteComment(CommentId: number) {
  return client.delete(`/comments/${CommentId}`);
}

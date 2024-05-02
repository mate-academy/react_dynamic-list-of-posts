import { Comment, NewComment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getCommentsByPostId(id: number) {
  return client.get<Comment[]>(`/comments?postId=${id}`);
}

export function postNewComment(comment: NewComment) {
  return client.post<Comment>(`/comments`, comment);
}

export function deleteComment(id: number) {
  return client.delete(`/comments/${id}`);
}

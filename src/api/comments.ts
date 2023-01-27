import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export function getAllByPost(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function post(comment: Partial<Comment>) {
  return client.post<Comment>('/comments', comment);
}

export function remove(id: number) {
  return client.delete(`/comments/${id}`);
}

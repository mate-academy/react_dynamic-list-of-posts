import { getData } from './api';

export function getComments() {
  return getData<Post[]>('/comments');
}

export function getPostComments(postId: number) {
  return getData<Comments[]>(`/comments?postId=${postId}`);
}

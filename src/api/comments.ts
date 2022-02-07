import { addData, getData, removeData } from './api';

export function getComments(postId: number): Promise<CommentPost[]> {
  return getData<CommentPost[]>(`/comments?postId=${postId}`);
}

export function removeComment(commentId: number): Promise<CommentPost> {
  return removeData<CommentPost>(`/comments/${commentId}`);
}

export function addComment(data: CommentPost): Promise<CommentPost> {
  return addData<CommentPost>('/comments', data);
}

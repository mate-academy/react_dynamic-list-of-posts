import { Post } from '../types/Post';
import { client } from './fetchClient';
import { Comment } from '../types/Comment';

export function getPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function deletePostComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

export function addPostComment({
  name,
  email,
  body,
  postId,
}: Omit<Comment, 'id'>) {
  return client.post<Comment>('/comments', { name, email, body, postId });
}

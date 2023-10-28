import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';

export function getPostComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function getCreateComment(comment: CommentData) {
  return client.post<Comment>('/comments', comment);
}

export function getUserPosts(userId: number) {
  return client.get<Post[]>('/posts')
    .then(posts => posts.filter(post => post.userId === userId));
}

export function getUsers() {
  return client.get<User[]>('/users');
}

export function getDeleteComment(commentId: number) {
  return client.delete(`/comments/${commentId}`);
}

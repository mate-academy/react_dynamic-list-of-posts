import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts() {
  return client.get<Post[]>('/posts');
}

export function getPostById(postId: number) {
  return client.get<Post>(`/posts/${postId}`);
}

export function getPostsByUserId(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function createPost({ userId, title, body }: Omit<Post, 'id'>) {
  return client.post<Post>('/posts', { userId, title, body });
}

export function updatePost({
  id,
  userId,
  title,
  body,
}: Post) {
  return client.patch<Post>(`/posts/${id}`, { userId, title, body });
}

export function deletePost(postId: number) {
  return client.delete(`/posts/${postId}`);
}

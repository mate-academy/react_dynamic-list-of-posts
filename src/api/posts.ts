import { request } from './helpers';

export function getPostsByUserId(userId: number): Promise<Post[]> {
  return request(`/posts?userId=${userId}`);
}

export function getAllPost(): Promise<Post[]> {
  return request('/posts');
}

export function getPostById(postId: number): Promise<Post> {
  return request(`/posts/${postId}`);
}

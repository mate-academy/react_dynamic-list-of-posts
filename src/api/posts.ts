import { getData } from './api';

export function getPosts(): Promise<Post[]> {
  return getData<Post[]>('/posts');
}

export function getUserPosts(userId: number): Promise<Post[]> {
  return getData<Post[]>(`/posts?userId=${userId}`);
}

export function selectedPostId(postId: number): Promise<Post> {
  return getData<Post>(`/posts/${postId}`);
}

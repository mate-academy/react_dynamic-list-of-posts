import { getData } from './api';
import { User } from '../types/User';
import { Post } from '../types/Post';

export function getUserPosts(userId: number): Promise<Post[]> {
  if (userId) {
    return getData<Post[]>(`/posts?userId=${userId}`);
  }

  return getData('/posts');
}

export function getPostDetails(postId: number): Promise<Post> {
  if (postId) {
    return getData<Post>(`/posts/${postId}`);
  }

  return getData('/posts');
}

export function getUsers():Promise<User[]> {
  return getData('/users');
}

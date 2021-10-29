import { Post } from '../types/post';
import { User } from '../types/user';
import { getData } from './api';

export function getUserPosts(userId: number): Promise<Post[]> {
  if (userId) {
    return getData<Post[]>(`/posts?userId=${userId}`);
  }

  return getData('/posts');
}

export const getUsers = (): Promise<User[]> => {
  return getData('/users');
};

export const getPostDetails = (postId: number): Promise<Post> => {
  if (postId) {
    return getData<Post>(`/posts/${postId}`);
  }

  return getData('/posts');
};

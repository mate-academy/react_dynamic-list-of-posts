import { Post } from '../types/Post';
import { getData } from './api';

export const getPosts = (): Promise<Post[]> => {
  return getData<Post[]>('/posts');
};

export const getPostDetails = (postId: number): Promise<Post> => {
  return getData<Post>(`/posts/${postId}`);
};

export const getUserPosts = (userId: number): Promise<Post[]> => {
  return getData<Post[]>(`/posts?userId=${userId}`);
};

import { Post } from '../types/Post';
import { get, getPosts } from './api';

export const getUserPosts = (userId: number) => {
  if (userId === 0) {
    return getPosts('');
  }

  return getPosts(`?userId=${userId}`);
};

export const getPostDetails = (postId: number) => {
  return get<Post>(`/posts/${postId}`);
};

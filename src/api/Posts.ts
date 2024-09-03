import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`).catch(() => {
    throw new Error('Unable to load posts');
  });
};

export const getPostById = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`).catch(() => {
    throw new Error('Unable to load post');
  });
};

import { Post } from '../types/Post';
import { client } from './fetchClient';

export const getUserPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPost = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

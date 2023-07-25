import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPost = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export const getPosts = () => {
  return client.get<Post[]>('/posts');
};

export const getPostsByUserId = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPostById = (postId: number) => {
  return client.get<Post>(`/posts/${postId}`);
};

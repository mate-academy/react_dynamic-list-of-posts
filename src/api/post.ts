import { get } from './api';
import Post from '../components/types/Post';

export const getPostsByUserID = (id: number): Promise<Post[]> => {
  if (!id) {
    return get('/posts');
  }

  return get(`/posts?userId=${id}`);
};

export const getPost = (): Promise<Post[]> => {
  return get('/posts');
};

export const getPostById = (id: number): Promise<Post> => {
  return get(`/posts/${id}`);
};

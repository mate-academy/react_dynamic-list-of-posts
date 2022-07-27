import { request } from './api';

export const getUserPosts = (endpoint: string): Promise<Post[]> => {
  return request(endpoint);
};

export const getUserPost = (endpoint: string): Promise<Post> => {
  return request(endpoint);
};

import { client } from '../utils/axiosClient';
import { IPost } from '../types/IPost';

export const getUserPosts = (userId: number) => {
  return client.get<IPost[]>(`/posts?userId=${userId}`);
};

export const getPosts = () => {
  return client.get<IPost[]>('/posts');
};

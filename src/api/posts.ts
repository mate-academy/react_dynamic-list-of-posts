import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (id: number) => {
  return client.get<Post[]>(`/posts?userId=${id}`);
};

export const getSinglePost = (id: number) => {
  return client.get<Post>(`/posts/${id}`);
};

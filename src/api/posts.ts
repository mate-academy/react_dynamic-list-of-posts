import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`/posts?userId=${userId}`);
};

export const getPost = (post: Post) => {
  return client.get<Post>(`/posts/${post.id}`);
};

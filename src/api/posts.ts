import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPostsByUserId = async (userId: number) => {
  const posts = await client.get<Post[]>(`/posts?userId=${userId}`);

  return posts;
};

export const getPostById = async (postId: number) => {
  const post = await client.get<Post>(`/posts/${postId}`);

  return post;
};

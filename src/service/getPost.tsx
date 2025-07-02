import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = async () => {
  return client.get('/posts');
};

export const getPostsByUserId = async (id: number) => {
  try {
    const posts = await client.get<Post[]>(`/posts?userId=${id}`);

    return posts;
  } catch {
    throw new Error();
  }
};

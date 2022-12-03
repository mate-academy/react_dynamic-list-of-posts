import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number) => {
  const posts = await client.get<Post[]>(`/posts?userId=${userId}`);

  return posts;
};

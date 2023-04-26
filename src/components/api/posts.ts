import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export const getPosts = async (userId: number) => {
  const posts = await client.get<Post[]>(`/posts?userId=${userId}`);

  return posts || null;
};

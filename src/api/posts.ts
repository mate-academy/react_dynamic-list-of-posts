import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: Post['userId']) => {
  return client.get<Post[]>(`
/posts?userId=${userId}`);
};

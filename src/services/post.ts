import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = (userId: number) =>
  client.get<Post[]>(`/posts?userId=${userId}`);

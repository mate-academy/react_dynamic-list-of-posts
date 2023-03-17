import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => (
  client.get<Post[]>(`/posts?userId=${userId}`)
);

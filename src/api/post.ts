import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getPostsOfUser = async (userId: number): Promise<Post[]> => (
  client.get<Post[]>(`/posts?userId=${userId}`)
);

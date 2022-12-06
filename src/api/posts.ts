/* eslint-disable @typescript-eslint/return-await */
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number) => {
  return await client.get<Post[]>(`/posts?userId=${userId}`);
};

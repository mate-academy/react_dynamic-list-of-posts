import { PostType } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userId: number) => {
  return client.get<PostType[]>(`/posts?userId=${userId}`);
};

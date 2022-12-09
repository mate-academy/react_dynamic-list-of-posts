import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getPosts = (userID: number) => {
  return client.get<Post[]>(`/posts?userId=${userID}`);
};

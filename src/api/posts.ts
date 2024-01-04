import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export const getUserPosts = (userId: number) => {
  let url = '/posts';

  if (userId) {
    url += `?userId=${userId}`;
  }

  return client.get<Post[]>(url);
};

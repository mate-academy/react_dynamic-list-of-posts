import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

export function getUserPosts(userId: number) {
  let url = '/posts';

  if (userId) {
    url += `?userId=${userId}`;
  }

  return client.get<Post[]>(url);
}

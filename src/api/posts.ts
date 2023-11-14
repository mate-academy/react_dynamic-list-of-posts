import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getUserPosts() {
  const url = '/posts';

  return client.get<Post[]>(url);
}

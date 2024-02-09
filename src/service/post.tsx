import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getPosts(url: string) {
  return client.get<Post[]>(url);
}

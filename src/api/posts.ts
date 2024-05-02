import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

export function getAllUserPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export function getPostById(id: number) {
  return client.get<Post>(`/posts/${id}`);
}

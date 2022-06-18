import { BASE_URL } from './api';

export function getUserPosts(userId: number): Promise<Post[]> {
  return fetch(`${BASE_URL}/posts${userId === 0 ? '' : `?userId=${userId}`}`)
    .then(response => response.json());
}

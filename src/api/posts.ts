import { BASE_URL } from './api';

export function getUserPosts(userId: number): Promise<UserPost[]> {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
}

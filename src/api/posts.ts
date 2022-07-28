import { BASE_URL } from './api';

export function getUserPosts(userId: number) {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(res => res.json())
    .catch(() => ({
      Error: 'Something gone wrong',
      status: 418,
    }));
}

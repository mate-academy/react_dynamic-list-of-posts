import { BASE_URL } from './api';

export const postsUrl = `${BASE_URL}/posts`;

export function request(url: string) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
}

export function getUserPosts(userId: number) {
  if (userId === 0) {
    return request(`${postsUrl}`);
  }

  return request(`${postsUrl}?userId=${userId}`);
}

export function getPostDetails(postId: number) {
  return request(`${postsUrl}/${postId}`);
}

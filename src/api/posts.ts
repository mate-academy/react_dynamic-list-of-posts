import { BASE_URL } from './api';

export function getPosts(): Promise<Post[]> {
  const url = `${BASE_URL}/posts`;

  return fetch(url)
    .then(res => res.json());
}

export const getUserPosts = (userId: number) => {
  const url = `${BASE_URL}/posts?userId=${userId}`;

  return fetch(url)
    .then(res => res.json());
};

export const getPostDetails = (postId: number) => {
  const url = `${BASE_URL}/posts/${postId}`;

  return fetch(url)
    .then(res => res.json());
};

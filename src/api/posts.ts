import { BASE_URL } from './api';

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const getUserPosts = (userId: number) => {
  return fetch(`${BASE_URL}/posts?userId=${userId}`)
    .then(response => response.json());
};

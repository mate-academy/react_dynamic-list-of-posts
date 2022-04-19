import { BASE_URL } from './api';

export const requestUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}
      - StatusText: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const fetchAllPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}
      - StatusText: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const getUserPosts = async (userId: number) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  const posts = await response.json();

  return posts;
};

export const getPostDetails = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  if (!response.ok) {
    throw new Error(`Status: ${response.status}
      - StatusText: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

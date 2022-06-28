import { BASE_URL } from './api';

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
}

export async function getUserPosts(userId: number) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  return response.json();
}

export async function getPostDetails(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
}

import { BASE_URL } from './api';

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();

  return posts;
}

export async function getUserPosts(userId: number) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  const posts = await response.json();

  return posts;
}

export async function getPostDetails(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  const post = await response.json();

  return post;
}

import { BASE_URL } from './api';

let response;

export async function getUserPosts(userId: number | null) {
  if (!userId) {
    response = await fetch(`${BASE_URL}/posts`);
  } else {
    response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  }

  return response.json();
}

export async function getPostDetails(postId: number) {
  const responsePostDetails = await fetch(`${BASE_URL}/posts/${postId}`);

  return responsePostDetails.json();
}

import { BASE_URL } from './api';

export async function getUserPosts(userId = 0) {
  let POST_URL = `${BASE_URL}/posts`;

  if (userId !== 0) {
    POST_URL = `${POST_URL}?userId=${userId}`;
  }

  const response = await fetch(POST_URL);

  return response.json();
}

export async function getPostDetails(postID: number) {
  const DETAILS_URL = `${BASE_URL}/posts/${postID}`;
  const response = await fetch(DETAILS_URL);

  return response.json();
}

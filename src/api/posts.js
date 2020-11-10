import { BASE_URL } from './api';

// export async function getUserPosts(userId) {
//   const response = await fetch(`${BASE_URL}/posts/${userId}`);
//   const result = await response.json();

//   return result;
// }

export async function getUserPosts(userId) {
  const response = await fetch(`${BASE_URL}/posts/`);
  const result = await response.json();

  return result;
}

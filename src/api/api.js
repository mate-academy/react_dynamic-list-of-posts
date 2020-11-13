export const BASE_URL = 'https://mate-api.herokuapp.com';

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  return (await response.json()).data;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return (await response.json()).data;
}
